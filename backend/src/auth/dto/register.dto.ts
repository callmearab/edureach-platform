import { IsEmail, IsString, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Fatima Osei' })
  @IsString() @MaxLength(120)
  name: string;

  @ApiProperty({ example: 'fatima@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString() @MinLength(8) @MaxLength(72)
  password: string;

  @ApiProperty({ enum: ['student','donor','volunteer','mentor'], default: 'student' })
  @IsEnum(['student','donor','volunteer','mentor']) @IsOptional()
  role?: string;
}

export class LoginDto {
  @ApiProperty({ example: 'fatima@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString() @MinLength(1)
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;
}
