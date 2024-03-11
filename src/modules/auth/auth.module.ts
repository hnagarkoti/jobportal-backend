import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CandidatesModule } from '../candidates/candidates.module';
import { CandidateStrategy } from './candidate.strategy';
import { CandidateJwtStrategy } from './candidate-jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    CandidatesModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    CandidateStrategy,
    CandidateJwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
