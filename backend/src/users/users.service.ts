import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email: email.toLowerCase().trim() } });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.repo.create({ ...data, email: data.email?.toLowerCase().trim() });
    return this.repo.save(user);
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.repo.update(id, { lastLoginAt: new Date() });
  }

  async updatePassword(id: string, hash: string): Promise<void> {
    await this.repo.update(id, { password: hash, passwordResetToken: undefined, passwordResetExpiry: undefined });
  }

  async savePasswordResetToken(id: string, token: string): Promise<void> {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);
    await this.repo.update(id, { passwordResetToken: token, passwordResetExpiry: expiry });
  }

  async findByResetToken(token: string): Promise<User | null> {
    return this.repo.findOne({ where: { passwordResetToken: token } });
  }

  async findAll(page = 1, limit = 20): Promise<[User[], number]> {
    return this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }
}
