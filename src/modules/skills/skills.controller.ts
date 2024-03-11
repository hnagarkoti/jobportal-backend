import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkillsService } from './skills.service';
import { Skills as SkillsEntity } from './skills.entity';
import { SkillsDto } from './dto/skills.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async findAll() {
    // get all skills in the db
    return await this.skillsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SkillsEntity> {
    // find the skill with this id
    const skill = await this.skillsService.findOne(id);

    // if the skill doesn't exit in the db, throw a 404 error
    if (!skill) {
      throw new NotFoundException("This Skills doesn't exist");
    }

    // if skill exist, return the skill
    return skill;
  }

  @Post()
  async create(
    @Body() skill: SkillsDto,
    @Request() req,
  ): Promise<SkillsEntity> {
    // create a new skill and return the newly created skill
    return await this.skillsService.create(skill);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() skill: SkillsDto,
    @Request() req,
  ): Promise<SkillsEntity> {
    // get the number of row affected and the updated skill
    const { numberOfAffectedRows, updatedSkill } =
      await this.skillsService.update(id, skill);

    // if the number of row affected is zero,
    // it means the skill doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Skill doesn't exist");
    }

    // return the updated skill
    return updatedSkill;
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the skill with this id
    const deleted = await this.skillsService.delete(id);

    // if the number of row affected is zero,
    // then the skills doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Skill doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
