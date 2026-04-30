import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, OneToMany, Index, BeforeInsert,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export type CourseLevel  = 'beginner' | 'intermediate' | 'advanced';
export type CourseStatus = 'draft' | 'published' | 'archived';

@Entity('courses')
@Index(['slug'], { unique: true })
@Index(['status'])
@Index(['category'])
export class Course {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ unique: true, length: 200 })
  slug: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ nullable: true })
  previewVideoUrl?: string;

  @ManyToOne(() => User, { eager: true })
  instructor: User;

  @Column({ length: 80 })
  category: string;

  @Column({ type: 'simple-array', default: '' })
  tags: string[];

  @Column({ type: 'enum', enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' })
  level: CourseLevel;

  @Column({ type: 'enum', enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: CourseStatus;

  @Column({ default: 0 })
  duration: number; // minutes

  @Column({ default: 0 })
  enrollmentCount: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: 0 })
  ratingCount: number;

  @Column({ default: true })
  isFree: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ default: true })
  certificate: boolean;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamptz' }) createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt: Date;

  @BeforeInsert() setId() { if (!this.id) this.id = uuidv4(); }
}

@Entity('enrollments')
@Index(['userId', 'courseId'], { unique: true })
export class Enrollment {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() userId:   string;
  @Column() courseId: string;

  @ManyToOne(() => Course, { eager: true })
  course: Course;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progress: number;

  @Column({ type: 'enum', enum: ['active', 'completed', 'dropped'], default: 'active' })
  status: string;

  @Column({ nullable: true, type: 'timestamptz' }) completedAt?: Date;
  @CreateDateColumn({ type: 'timestamptz' }) enrolledAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt:  Date;
}
