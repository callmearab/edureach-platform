import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, Index, BeforeInsert,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export type AidCategory = 'financial' | 'material' | 'medical' | 'educational' | 'emergency';
export type AidStatus   = 'submitted' | 'reviewing' | 'approved' | 'rejected' | 'fulfilled';
export type AidPriority = 'low' | 'medium' | 'high' | 'urgent';

@Entity('aid_requests')
@Index(['status'])
@Index(['priority'])
@Index(['userId'])
export class AidRequest {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() userId: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column({ type: 'enum', enum: ['financial','material','medical','educational','emergency'] })
  category: AidCategory;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  amountRequested?: number;

  @Column({ type: 'enum', enum: ['submitted','reviewing','approved','rejected','fulfilled'], default: 'submitted' })
  status: AidStatus;

  @Column({ type: 'enum', enum: ['low','medium','high','urgent'], default: 'medium' })
  priority: AidPriority;

  @Column({ type: 'simple-array', default: '' })
  documents: string[];

  @Column({ nullable: true, type: 'text' })
  adminNotes?: string;

  @Column({ nullable: true }) reviewedBy?: string;
  @Column({ nullable: true, type: 'timestamptz' }) reviewedAt?: Date;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt: Date;

  @BeforeInsert() setId() { if (!this.id) this.id = uuidv4(); }
}
