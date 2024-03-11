import { Injectable, Inject } from '@nestjs/common';
import { Skills } from './skills.entity';
import { SkillsDto } from './dto/skills.dto';
import { User } from '../users/user.entity';
import { SKILLS_REPOSITORY } from '../../core/constants';

@Injectable()
export class SkillsService {
  constructor(
    @Inject(SKILLS_REPOSITORY) private readonly skillsRepository: typeof Skills,
  ) {}

  async create(skills: SkillsDto): Promise<Skills> {
    return await this.skillsRepository.create<Skills>({ ...skills });
  }

  async findAll(): Promise<Skills[]> {
    return await this.skillsRepository.findAll<Skills>({});
  }

  async findOne(id): Promise<Skills> {
    return await this.skillsRepository.findOne({
      where: { id },
    });
  }

  async delete(id) {
    return await this.skillsRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedSkill]] =
      await this.skillsRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedSkill };
  }
}
