import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('refresh_tokens')
@Index(['userId'])
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() userId: string;
  @Column() tokenHash: string;
  @Column({ default: false }) revoked: boolean;
  @Column({ type: 'timestamptz' }) expiresAt: Date;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt: Date;
  @BeforeInsert() setId() { if (!this.id) this.id = uuidv4(); }
}
