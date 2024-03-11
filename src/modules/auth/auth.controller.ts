import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { DoesCandidateExist } from 'src/core/guards/doesCandidateExist.guard';
import { CandidateDto } from '../candidates/dto/candidate.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }

  @UseGuards(DoesCandidateExist)
  @Post('candidates/signup')
  async candidateSignUp(@Body() user: CandidateDto) {
    return await this.authService.createCandidate(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('candidates/login')
  async candidateLogin(@Request() req) {
    return await this.authService.candidateLogin(req.user);
  }
}
