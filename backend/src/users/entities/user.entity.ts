import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, OneToMany, Index, BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export type UserRole = 'admin' | 'student' | 'donor' | 'volunteer' | 'mentor';

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 120 })
  name: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'enum', enum: ['admin', 'student', 'donor', 'volunteer', 'mentor'], default: 'student' })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  @Exclude()
  passwordResetToken?: string;

  @Column({ nullable: true, type: 'timestamptz' })
  @Exclude()
  passwordResetExpiry?: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  lastLoginAt?: Date;

  // ── Profile ──────────────────────────────────────────────────────────────
  @Column({ nullable: true, type: 'text' })
  bio?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'simple-array', nullable: true })
  skills?: string[];

  @Column({ nullable: true })
  linkedin?: string;

  @Column({ nullable: true })
  github?: string;

  // ── Preferences ──────────────────────────────────────────────────────────
  @Column({ type: 'jsonb', default: {} })
  preferences: Record<string, unknown>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @BeforeInsert()
  setId() {
    if (!this.id) this.id = uuidv4();
  }

  get isAdmin()     { return this.role === 'admin'; }
  get isMentor()    { return this.role === 'mentor'; }
  get isVolunteer() { return this.role === 'volunteer'; }
}
