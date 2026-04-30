import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LocalStrategyBase } from 'passport-local';
import { Strategy as GoogleStrategyBase, Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as GithubStrategyBase, Profile as GithubProfile } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

// ── Local (email + password) ────────────────────────────────────────────────
@Injectable()
export class LocalStrategy extends PassportStrategy(LocalStrategyBase, 'local') {
  constructor(private auth: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string) {
    const user = await this.auth.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}

// ── Google OAuth ─────────────────────────────────────────────────────────────
@Injectable()
export class GoogleStrategy extends PassportStrategy(GoogleStrategyBase, 'google') {
  constructor(config: ConfigService) {
    super({
      clientID:     config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL:  config.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }
  validate(_at: string, _rt: string, profile: GoogleProfile) {
    return {
      email:  profile.emails?.[0]?.value,
      name:   profile.displayName,
      avatar: profile.photos?.[0]?.value,
    };
  }
}

// ── GitHub OAuth ─────────────────────────────────────────────────────────────
@Injectable()
export class GithubStrategy extends PassportStrategy(GithubStrategyBase, 'github') {
  constructor(config: ConfigService) {
    super({
      clientID:     config.get('GITHUB_CLIENT_ID'),
      clientSecret: config.get('GITHUB_CLIENT_SECRET'),
      callbackURL:  config.get('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }
  validate(_at: string, _rt: string, profile: GithubProfile) {
    return {
      email:  (profile.emails as any)?.[0]?.value,
      name:   profile.displayName || profile.username,
      avatar: profile.photos?.[0]?.value,
    };
  }
}
