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
import { CandidateSkillsService } from './candidate-skills.service';
import { CandidateSkills as CandidateSkillsEntity } from './candidate-skills.entity';
import { CandiateSkillsDto } from './dto/candidate-skills.dto';

@Controller('candidate-skills')
export class CandidateSkillsController {
  constructor(
    private readonly candidateSkillsService: CandidateSkillsService,
  ) {}

  @Get()
  async findAll() {
    // get all skills in the db
    return await this.candidateSkillsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CandidateSkillsEntity> {
    // find the skill with this id
    const skill = await this.candidateSkillsService.findOne(id);

    // if the skill doesn't exit in the db, throw a 404 error
    if (!skill) {
      throw new NotFoundException("This Skills doesn't exist");
    }

    // if skill exist, return the skill
    return skill;
  }

  @Get('candidate/:candidateId')
  async findSkillsByCandidateId(
    @Param('candidateId') candidateId: number,
  ): Promise<CandidateSkillsEntity[]> {
    // find the skill with this id
    const skills = await this.candidateSkillsService.findSkillsByCandidateId(
      candidateId,
    );

    // if the skill doesn't exit in the db, throw a 404 error
    if (!skills) {
      throw new NotFoundException("This Candidate Skills doesn't exist");
    }

    // if skill exist, return the skill
    return skills;
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Put('candidate/:candidateId')
  // async candidateUpdate(
  //   @Param('candidateId') candidateId: number,
  //   @Body() candidateSkill: CandiateSkillsDto,
  //   @Request() req,
  // ): Promise<CandidateSkillsEntity> {
  //   // get the number of row affected and the updated skill
  //   const { numberOfAffectedRows, updatedSkill } =
  //     await this.candidateSkillsService.updateByCandidateId(
  //       candidateId,
  //       candidateSkill,
  //     );

  //   // if the number of row affected is zero,
  //   // it means the skill doesn't exist in our db
  //   if (numberOfAffectedRows === 0) {
  //     throw new NotFoundException("This Candidate Skill doesn't exist");
  //   }

  //   // return the updated skill
  //   return updatedSkill;
  // }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() candidateSkill: CandiateSkillsDto,
    @Request() req,
  ): Promise<CandidateSkillsEntity> {
    // create a new post and return the newly created post
    return await this.candidateSkillsService.create(
      candidateSkill,
      req.user.id,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() candidateSkill: CandiateSkillsDto,
    @Request() req,
  ): Promise<CandidateSkillsEntity> {
    // get the number of row affected and the updated skill
    const { numberOfAffectedRows, updatedSkill } =
      await this.candidateSkillsService.update(id, candidateSkill);

    // if the number of row affected is zero,
    // it means the skill doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Candidate Skill doesn't exist");
    }

    // return the updated skill
    return updatedSkill;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the skill with this id
    const deleted = await this.candidateSkillsService.delete(id);

    // if the number of row affected is zero,
    // then the skills doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Skill doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
