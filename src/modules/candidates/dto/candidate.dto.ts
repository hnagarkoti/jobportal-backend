import {
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsNumber,
  MaxLength,
  IsEnum,
  IsDate,
  IsString,
} from 'class-validator';

export enum CandidateProfileStatus {
  CONTACTED = 'Contacted',
  INTERVIEW_SCHEDULED = 'Interview Scheduled',
  OFFER_EXTENDED = 'Offer Extended',
  HIRED = 'Hired',
  REJECTED = 'Rejected',
  NEW_PROFILE = 'New Profile',
}

export class CandidateDto {
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(10)
  readonly phone: string;

  @IsNotEmpty()
  @MinLength(2)
  readonly qualification: string;

  // @IsEnum(CandidateProfileStatus, {
  //   message: 'candidate status must be one of the defined values',
  // })
  // readonly current_status: CandidateProfileStatus;

  @IsNotEmpty()
  readonly current_ctc: number;

  @IsNotEmpty()
  readonly expected_ctc: number;

  // readonly score: number;
}
