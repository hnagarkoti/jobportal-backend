import { Module } from '@nestjs/common';
import { CandidateSkillsService } from './candidate-skills.service';
import { CandidateSkillsController } from './candidate-skills.controller';
import { candidateSkillsProviders } from './candidate-skills.providers';

@Module({
  providers: [CandidateSkillsService, ...candidateSkillsProviders],
  controllers: [CandidateSkillsController],
})
export class CandidateSkillsModule {}
