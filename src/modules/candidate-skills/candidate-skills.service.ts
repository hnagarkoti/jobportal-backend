import { Injectable, Inject } from '@nestjs/common';
import { CandidateSkills } from './candidate-skills.entity';
import { CandiateSkillsDto } from './dto/candidate-skills.dto';
import { CANDIDATE_SKILLS_REPOSITORY } from '../../core/constants';
import { Skills } from '../skills/skills.entity';
import { Candidates } from '../candidates/candidate.entity';
import { CandidatesService } from '../candidates/candidates.service';
import { SkillsService } from '../skills/skills.service';

export enum SKILL_EXPERIENCE_MAPPING {
  REACT_JS = 'React Js',
  NODE_JS = 'Node Js',
  ANGULAR_JS = 'Angular Js',
  JAVA = 'Java',
  SPRINT_BOOT = 'Sprint Boot',
  GRAPHQL = 'GraphQl',
}

@Injectable()
export class CandidateSkillsService {
  constructor(
    @Inject(CANDIDATE_SKILLS_REPOSITORY)
    private readonly candidateSkillsRepository: typeof CandidateSkills,
    private candidateService: CandidatesService,
    private skillService: SkillsService,
  ) {}

  //   async create(candidateSkills: CandiateSkillsDto): Promise<CandidateSkills> {
  //     return await this.candidateSkillsRepository.create<CandidateSkills>({
  //       ...candidateSkills,
  //     });
  //   }

  async computeScore(experience: number, score = 0, currentSkillName: string) {
    if (
      currentSkillName === SKILL_EXPERIENCE_MAPPING.REACT_JS ||
      currentSkillName === SKILL_EXPERIENCE_MAPPING.NODE_JS
    ) {
      if (experience > 2) {
        score = score + 3;
      } else if (experience > 1 && experience <= 2) {
        score = score + 2;
      } else {
        score = score + 1;
      }
    } else {
      score = score;
    }

    return score;
  }

  async create(
    canidateSkills: CandiateSkillsDto,
    candidateId,
  ): Promise<CandidateSkills | any> {
    const candidateInfo = await this.candidateService.findOneById(candidateId);
    console.log(`Full Candidate Info: `, candidateInfo);
    console.log(
      `candidateInfo.experience:`,
      candidateInfo.experience,
      'candidateInfo.score: ',
      Math.floor(candidateInfo.score),
    );
    // const candidateSkills = await this.candidateSkillsRepository.findAll({
    //   where: {
    //     candidateId: candidateId,
    //   },
    // });
    const currentSkill = await this.skillService.findOne(
      canidateSkills.skillId,
    );
    // console.log(`candidateSkills:: `, candidateSkills);
    console.log(`currentSkill:;:: `, currentSkill);
    console.log(`Current SKill name; `, currentSkill.name);
    const score = await this.computeScore(
      candidateInfo.experience,
      Math.floor(candidateInfo.score),
      currentSkill.name,
    );
    console.log(`Final Score: `, score);
    const scoreUpdatedResult = await this.candidateService.update(candidateId, {
      score,
    });
    console.log(`scoreUpdatedResult:: `, scoreUpdatedResult);

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
  async updateByCandidateId(id, data) {
    const [numberOfAffectedRows, [updatedSkill]] =
      await this.candidateSkillsRepository.update(
        { ...data },
        { where: { candidateId: id }, returning: true },
      );

    return { numberOfAffectedRows, updatedSkill };
  }
}
