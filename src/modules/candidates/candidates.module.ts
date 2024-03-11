import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { candidatesProviders } from './candidates.provider';

@Module({
  providers: [CandidatesService, ...candidatesProviders],
  controllers: [CandidatesController],
  exports: [CandidatesService],
})
export class CandidatesModule {}
