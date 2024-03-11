import { IsNotEmpty, IsNumber } from 'class-validator';

export class CandiateSkillsDto {
  @IsNumber()
  readonly skillId: number;
}
