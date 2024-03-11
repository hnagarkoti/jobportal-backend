import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { CandidateProfileStatus } from './dto/candidate.dto';

@Table
export class Candidates extends Model<Candidates> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  qualification: string;

  @Column({
    type: DataType.ENUM,
    values: [
      CandidateProfileStatus.CONTACTED,
      CandidateProfileStatus.INTERVIEW_SCHEDULED,
      CandidateProfileStatus.OFFER_EXTENDED,
      CandidateProfileStatus.HIRED,
      CandidateProfileStatus.REJECTED,
      CandidateProfileStatus.NEW_PROFILE,
    ],
    defaultValue: CandidateProfileStatus.NEW_PROFILE,
  })
  current_status: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  current_ctc: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  expected_ctc: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0,
  })
  score: number;
}
