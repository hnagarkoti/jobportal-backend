import { Module } from '@nestjs/common';
import { CandidateSkillsService } from './candidate-skills.service';
import { CandidateSkillsController } from './candidate-skills.controller';
import { candidateSkillsProviders } from './candidate-skills.providers';
import { CandidatesService } from '../candidates/candidates.service';
import { CandidatesModule } from '../candidates/candidates.module';
import { candidatesProviders } from '../candidates/candidates.provider';
import { SkillsService } from '../skills/skills.service';
import { skillsProviders } from '../skills/skills.providers';

@Module({
  imports: [CandidatesModule],
  providers: [
    CandidateSkillsService,
    CandidatesService,
    SkillsService,
    ...candidateSkillsProviders,
    ...candidatesProviders,
    ...skillsProviders,
  ],
  controllers: [CandidateSkillsController],
})
export class CandidateSkillsModule {}
