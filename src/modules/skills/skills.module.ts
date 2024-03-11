import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { skillsProviders } from './skills.providers';

@Module({
  providers: [SkillsService, ...skillsProviders],
  controllers: [SkillsController],
  exports: [SkillsService],
})
export class SkillsModule {}
