import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, Enrollment } from './entities/course.entity';

@Module({ imports: [TypeOrmModule.forFeature([Course, Enrollment])], exports: [] })
export class CoursesModule {}
