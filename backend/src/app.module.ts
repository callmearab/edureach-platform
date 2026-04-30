import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { redisStore } from 'cache-manager-redis-yet';

// ── Feature Modules ──────────────────────────────────────────────────────────
import { AuthModule }          from './auth/auth.module';
import { UsersModule }         from './users/users.module';
import { CoursesModule }       from './courses/courses.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { AidModule }           from './aid/aid.module';
import { DonationsModule }     from './donations/donations.module';
import { VolunteersModule }    from './volunteers/volunteers.module';
import { EventsModule }        from './events/events.module';
import { BlogModule }          from './blog/blog.module';
import { AdminModule }         from './admin/admin.module';
import { UploadsModule }       from './uploads/uploads.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AnalyticsModule }     from './analytics/analytics.module';
import { HealthModule }        from './health/health.module';

@Module({
  imports: [
    // ── Config ──────────────────────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal:   true,
      envFilePath: ['.env.local', '.env'],
    }),

    // ── Database ─────────────────────────────────────────────────────────────
    TypeOrmModule.forRootAsync({
      inject:     [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type:               'postgres',
        url:                cfg.get<string>('DATABASE_URL'),
        entities:           [__dirname + '/**/*.entity{.ts,.js}'],
        migrations:         [__dirname + '/database/migrations/*{.ts,.js}'],
        synchronize:        cfg.get('NODE_ENV') !== 'production',
        logging:            cfg.get('DB_LOGGING', 'false') === 'true',
        ssl:                cfg.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
        extra: { max: 20, idleTimeoutMillis: 30000, connectionTimeoutMillis: 2000 },
      }),
    }),

    // ── Cache (Redis) ─────────────────────────────────────────────────────────
    CacheModule.registerAsync({
      isGlobal: true,
      inject:   [ConfigService],
      useFactory: async (cfg: ConfigService) => ({
        store:  await redisStore({ socket: { host: cfg.get('REDIS_HOST', 'localhost'), port: cfg.get<number>('REDIS_PORT', 6379) } }),
        ttl:    cfg.get<number>('CACHE_TTL', 300) * 1000,
      }),
    }),

    // ── Rate limiting ─────────────────────────────────────────────────────────
    ThrottlerModule.forRoot([
      { name: 'short',  ttl: 1000,  limit: 10 },
      { name: 'medium', ttl: 10000, limit: 50 },
      { name: 'long',   ttl: 60000, limit: 200 },
    ]),

    // ── Event emitter ─────────────────────────────────────────────────────────
    EventEmitterModule.forRoot({ wildcard: true }),

    // ── Task scheduler ────────────────────────────────────────────────────────
    ScheduleModule.forRoot(),

    // ── Bull queues ───────────────────────────────────────────────────────────
    BullModule.forRootAsync({
      inject:     [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        redis: { host: cfg.get('REDIS_HOST', 'localhost'), port: cfg.get<number>('REDIS_PORT', 6379) },
      }),
    }),

    // ── Feature modules ───────────────────────────────────────────────────────
    AuthModule,
    UsersModule,
    CoursesModule,
    OpportunitiesModule,
    AidModule,
    DonationsModule,
    VolunteersModule,
    EventsModule,
    BlogModule,
    AdminModule,
    UploadsModule,
    NotificationsModule,
    AnalyticsModule,
    HealthModule,
  ],
})
export class AppModule {}
