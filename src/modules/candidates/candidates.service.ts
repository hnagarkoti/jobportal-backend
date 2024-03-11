import { Injectable, Inject } from '@nestjs/common';
import { Candidates } from './candidate.entity';
import { CandidateDto } from './dto/candidate.dto';
import { User } from '../users/user.entity';
import { CANDIDATES_REPOSITORY } from '../../core/constants';

@Injectable()
export class CandidatesService {
  constructor(
    @Inject(CANDIDATES_REPOSITORY)
    private readonly candidatesRepository: typeof Candidates,
  ) {}

  async create(candidate: CandidateDto): Promise<Candidates> {
    console.log(`candidate payload: `, candidate);
    return await this.candidatesRepository.create<Candidates>(candidate);
  }

  async findAll(): Promise<Candidates[]> {
    return await this.candidatesRepository.findAll<Candidates>({
      order: [['score', 'DESC']],
    });
  }
  async findOneByEmail(email: string): Promise<Candidates> {
    return await this.candidatesRepository.findOne<Candidates>({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<Candidates> {
    return await this.candidatesRepository.findOne<Candidates>({
      where: { id },
    });
  }

  async findOne(id): Promise<Candidates> {
    return await this.candidatesRepository.findOne({
      where: { id },
    });
  }

  async delete(id) {
    return await this.candidatesRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedCandidate]] =
      await this.candidatesRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedCandidate };
  }
}
