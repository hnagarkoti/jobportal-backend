import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../modules/users/users.service';
import { CandidatesService } from 'src/modules/candidates/candidates.service';

@Injectable()
export class DoesCandidateExist implements CanActivate {
  constructor(private readonly candidateService: CandidatesService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userExist = await this.candidateService.findOneByEmail(
      request.body.email,
    );
    if (userExist) {
      throw new ForbiddenException('This email already exist');
    }
    return true;
  }
}
