import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CandidatesService } from './candidates.service';
import { Candidates as CandidateEntity } from './candidate.entity';
import { CandidateDto } from './dto/candidate.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidateService: CandidatesService) {}

  @Get()
  async findAll() {
    // get all candidates from the db
    return await this.candidateService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CandidateEntity> {
    // find the candidate with this id
    const candidate = await this.candidateService.findOne(id);

    // if the candidate doesn't exit in the db, throw a 404 error
    if (!candidate) {
      throw new NotFoundException("This Candidate doesn't exist");
    }

    // if candidate exist, return the candidate
    return candidate;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() candidate: CandidateDto,
    @Request() req,
  ): Promise<CandidateEntity> {
    // get the number of row affected and the updated Candidate
    const { numberOfAffectedRows, updatedCandidate } =
      await this.candidateService.update(id, candidate);

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Candidate doesn't exist");
    }

    // return the updated Candidate
    return updatedCandidate;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the candidate with this id
    const deleted = await this.candidateService.delete(id);

    // if the number of row affected is zero,
    // then the candidate doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This candidate doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
