import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, Index, BeforeInsert,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export type DonationFreq   = 'one-time' | 'monthly' | 'quarterly' | 'annually';
export type DonationStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
export type DonationCamp   = 'general' | 'education' | 'emergency' | 'scholarship';

@Entity('donations')
@Index(['status'])
@Index(['campaign'])
@Index(['userId'])
export class Donation {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ nullable: true }) userId?: string;

  @ManyToOne(() => User, { nullable: true, eager: true })
  donor?: User;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ length: 3, default: 'USD' })
  currency: string;

  @Column({ type: 'enum', enum: ['one-time', 'monthly', 'quarterly', 'annually'], default: 'one-time' })
  frequency: DonationFreq;

  @Column({ type: 'enum', enum: ['general', 'education', 'emergency', 'scholarship'], default: 'general' })
  campaign: DonationCamp;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'], default: 'pending' })
  status: DonationStatus;

  @Column({ default: false })
  anonymous: boolean;

  @Column({ nullable: true, type: 'text' })
  message?: string;

  @Column({ unique: true })
  transactionId: string;

  @Column({ nullable: true })
  stripeCustomerId?: string;

  @Column({ nullable: true })
  stripeSubscriptionId?: string;

  @Column({ nullable: true })
  receiptUrl?: string;

  @Column({ nullable: true })
  donorEmail?: string;

  @Column({ nullable: true })
  donorName?: string;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt: Date;

  @BeforeInsert() setId() { if (!this.id) this.id = uuidv4(); }
}
