import {
  Injectable, UnauthorizedException, ForbiddenException,
  ConflictException, BadRequestException, Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import { JwtService }       from '@nestjs/jwt';
import { ConfigService }    from '@nestjs/config';
import { EventEmitter2 }    from '@nestjs/event-emitter';
import * as bcrypt          from 'bcryptjs';
import { v4 as uuidv4 }    from 'uuid';

import { User }             from '../users/entities/user.entity';
import { RefreshToken }     from './entities/refresh-token.entity';
import { UsersService }     from '../users/users.service';
import { RegisterDto }      from './dto/register.dto';
import { LoginDto }         from './dto/login.dto';

export interface TokenPair {
  accessToken:  string;
  refreshToken: string;
  expiresIn:    number;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly SALT_ROUNDS = 12;

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
    private readonly usersService: UsersService,
    private readonly jwtService:   JwtService,
    private readonly config:       ConfigService,
    private readonly events:       EventEmitter2,
  ) {}

  // ── Registration ──────────────────────────────────────────────────────────
  async register(dto: RegisterDto): Promise<TokenPair> {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already in use');

    const hash = await bcrypt.hash(dto.password, this.SALT_ROUNDS);
    const user = await this.usersService.create({ ...dto, password: hash });

    this.events.emit('user.registered', { userId: user.id, email: user.email });
    this.logger.log(`New user registered: ${user.email}`);

    return this.generateTokenPair(user);
  }

  // ── Login ─────────────────────────────────────────────────────────────────
  async login(dto: LoginDto): Promise<TokenPair> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    if (!user.isActive) throw new ForbiddenException('Account is disabled');

    await this.usersService.updateLastLogin(user.id);
    this.events.emit('user.logged_in', { userId: user.id });

    return this.generateTokenPair(user);
  }

  // ── Validate user (Passport local) ────────────────────────────────────────
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    return valid ? user : null;
  }

  // ── Refresh tokens ────────────────────────────────────────────────────────
  async refreshTokens(userId: string, refreshToken: string): Promise<TokenPair> {
    const stored = await this.refreshRepo.findOne({
      where: { userId, revoked: false },
      order: { createdAt: 'DESC' },
    });

    if (!stored) throw new UnauthorizedException('Invalid refresh token');

    const valid = await bcrypt.compare(refreshToken, stored.tokenHash);
    if (!valid || stored.expiresAt < new Date()) {
      await this.revokeAllRefreshTokens(userId);
      throw new UnauthorizedException('Refresh token expired or invalid');
    }

    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException();

    // Rotate — revoke old, issue new
    stored.revoked = true;
    await this.refreshRepo.save(stored);

    return this.generateTokenPair(user);
  }

  // ── OAuth (Google / GitHub) ───────────────────────────────────────────────
  async handleOAuthLogin(oauthUser: Partial<User>): Promise<TokenPair> {
    let user = await this.usersService.findByEmail(oauthUser.email!);

    if (!user) {
      user = await this.usersService.create({
        email:     oauthUser.email!,
        name:      oauthUser.name!,
        avatar:    oauthUser.avatar,
        password:  await bcrypt.hash(uuidv4(), this.SALT_ROUNDS),
        role:      'student',
        isVerified: true,
      });
      this.events.emit('user.registered', { userId: user.id, email: user.email, via: 'oauth' });
    }

    return this.generateTokenPair(user);
  }

  // ── Logout ────────────────────────────────────────────────────────────────
  async logout(userId: string): Promise<void> {
    await this.revokeAllRefreshTokens(userId);
    this.logger.log(`User logged out: ${userId}`);
  }

  // ── Password reset ────────────────────────────────────────────────────────
  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return; // Silent — don't reveal existence
    const token = uuidv4();
    await this.usersService.savePasswordResetToken(user.id, token);
    this.events.emit('auth.password_reset_requested', { userId: user.id, email, token });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findByResetToken(token);
    if (!user) throw new BadRequestException('Invalid or expired reset token');
    const hash = await bcrypt.hash(newPassword, this.SALT_ROUNDS);
    await this.usersService.updatePassword(user.id, hash);
    await this.revokeAllRefreshTokens(user.id);
    this.events.emit('auth.password_changed', { userId: user.id });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  private async generateTokenPair(user: User): Promise<TokenPair> {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload);
    const rawRefresh  = uuidv4();
    const expiresIn   = 15 * 60; // 15 minutes

    const rtExpiry  = new Date();
    rtExpiry.setDate(rtExpiry.getDate() + 30);

    const rt = this.refreshRepo.create({
      userId:    user.id,
      tokenHash: await bcrypt.hash(rawRefresh, 10),
      expiresAt: rtExpiry,
    });
    await this.refreshRepo.save(rt);

    return { accessToken, refreshToken: rawRefresh, expiresIn };
  }

  private async revokeAllRefreshTokens(userId: string): Promise<void> {
    await this.refreshRepo.update({ userId, revoked: false }, { revoked: true });
  }
}
