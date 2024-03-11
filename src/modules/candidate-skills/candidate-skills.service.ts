import { Injectable, Inject } from '@nestjs/common';
import { CandidateSkills } from './candidate-skills.entity';
import { CandiateSkillsDto } from './dto/candidate-skills.dto';
import { User } from '../users/user.entity';
import { CANDIDATE_SKILLS_REPOSITORY } from '../../core/constants';
import { Skills } from '../skills/skills.entity';
import { Candidates } from '../candidates/candidate.entity';

@Injectable()
export class CandidateSkillsService {
  constructor(
    @Inject(CANDIDATE_SKILLS_REPOSITORY)
    private readonly candidateSkillsRepository: typeof CandidateSkills,
  ) {}

  //   async create(candidateSkills: CandiateSkillsDto): Promise<CandidateSkills> {
  //     return await this.candidateSkillsRepository.create<CandidateSkills>({
  //       ...candidateSkills,
  //     });
  //   }

  async create(
    canidateSkills: CandiateSkillsDto,
    candidateId,
  ): Promise<CandidateSkills> {
    return await this.candidateSkillsRepository.create<CandidateSkills>({
      ...canidateSkills,
      candidateId,
    });
  }
  async findAll(): Promise<CandidateSkills[]> {
    return await this.candidateSkillsRepository.findAll<CandidateSkills>({
      include: [
        { model: Skills },
        { model: Candidates, attributes: { exclude: ['password'] } },
      ],
    });
  }

  async findOne(id): Promise<CandidateSkills> {
    return await this.candidateSkillsRepository.findOne({
      where: { id },
    });
  }

  async findSkillsByCandidateId(candidateId): Promise<CandidateSkills[]> {
    return await this.candidateSkillsRepository.findAll({
      where: { candidateId: candidateId },
      include: [
        { model: Skills },
        { model: Candidates, attributes: { exclude: ['password'] } },
      ],
    });
  }

  async delete(id) {
    return await this.candidateSkillsRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedSkill]] =
      await this.candidateSkillsRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedSkill };
  }
}
