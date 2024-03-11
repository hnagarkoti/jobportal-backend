import { CandidateSkills } from './candidate-skills.entity';
import { CANDIDATE_SKILLS_REPOSITORY } from '../../core/constants';

export const candidateSkillsProviders = [
  {
    provide: CANDIDATE_SKILLS_REPOSITORY,
    useValue: CandidateSkills,
  },
];
