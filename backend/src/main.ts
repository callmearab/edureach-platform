import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app    = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log', 'debug'] });

  const config = app.get(ConfigService);
  const port   = config.get<number>('PORT', 4000);
  const origin = config.get<string>('CORS_ORIGIN', 'http://localhost:3000');

  // ── Security ──────────────────────────────────────────────────────────────
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc:   ["'self'", "'unsafe-inline'"],
        scriptSrc:  ["'self'"],
        imgSrc:     ["'self'", 'data:', 'https:'],
      },
    },
  }));

  // ── Compression ───────────────────────────────────────────────────────────
  app.use(compression());

  // ── CORS ──────────────────────────────────────────────────────────────────
  app.enableCors({
    origin:      origin.split(','),
    credentials: true,
    methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // ── Global prefix ─────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ── Validation ────────────────────────────────────────────────────────────
  app.useGlobalPipes(new ValidationPipe({
    whitelist:        true,
    forbidNonWhitelisted: true,
    transform:        true,
    transformOptions: { enableImplicitConversion: true },
  }));

  // ── Swagger / OpenAPI ─────────────────────────────────────────────────────
  if (config.get('NODE_ENV') !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('EduReach API')
      .setDescription('EduReach Global Foundation — REST API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth',          'Authentication & authorization')
      .addTag('users',         'User management')
      .addTag('courses',       'LMS – courses & enrollment')
      .addTag('opportunities', 'Scholarships, jobs, grants')
      .addTag('aid',           'Aid request management')
      .addTag('donations',     'Donation processing')
      .addTag('volunteers',    'Volunteer management')
      .addTag('events',        'Events management')
      .addTag('blog',          'Blog posts')
      .addTag('admin',         'Admin operations')
      .addTag('uploads',       'File storage')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
    logger.log(`Swagger docs: http://localhost:${port}/api/docs`);
  }

  await app.listen(port);
  logger.log(`🚀 EduReach API running on http://localhost:${port}/api/v1`);
  logger.log(`📚 Environment: ${config.get('NODE_ENV', 'development')}`);
}

bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
