import { IsNotEmpty } from 'class-validator';

export class SkillsDto {
  @IsNotEmpty()
  readonly name: string;
}
