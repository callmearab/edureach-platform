import { Module }           from '@nestjs/common';
import { JwtModule }        from '@nestjs/jwt';
import { PassportModule }   from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule }    from '@nestjs/typeorm';

import { AuthController }   from './auth.controller';
import { AuthService }      from './auth.service';
import { JwtStrategy }      from './strategies/jwt.strategy';
import { LocalStrategy }    from './strategies/local.strategy';
import { GoogleStrategy }   from './strategies/google.strategy';
import { GithubStrategy }   from './strategies/github.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

import { User }             from '../users/entities/user.entity';
import { RefreshToken }     from './entities/refresh-token.entity';
import { UsersModule }      from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports:    [ConfigModule],
      inject:     [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret:           cfg.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn:   cfg.get<string>('JWT_EXPIRES_IN', '15m'),
          issuer:      'edureach-api',
          audience:    'edureach-app',
        },
      }),
    }),
    TypeOrmModule.forFeature([User, RefreshToken]),
  ],
  controllers: [AuthController],
  providers:   [AuthService, JwtStrategy, LocalStrategy, GoogleStrategy, GithubStrategy, RefreshTokenStrategy],
  exports:     [AuthService, JwtModule],
})
export class AuthModule {}
