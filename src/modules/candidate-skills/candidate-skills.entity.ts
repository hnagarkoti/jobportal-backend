import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { CandiateSkillsDto } from './dto/candidate-skills.dto';
import { Skills } from '../skills/skills.entity';
import { Candidates } from '../candidates/candidate.entity';

@Table
export class CandidateSkills extends Model<CandidateSkills> {
  @ForeignKey(() => Candidates)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  candidateId: Candidates;

  @BelongsTo(() => Candidates)
  candidates: Candidates;

  @ForeignKey(() => Skills)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  skillId: number;

  @BelongsTo(() => Skills)
  skills: Skills;
}
