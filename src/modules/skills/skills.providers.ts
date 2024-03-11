import { Skills } from './skills.entity';
import { SKILLS_REPOSITORY } from '../../core/constants';

export const skillsProviders = [
  {
    provide: SKILLS_REPOSITORY,
    useValue: Skills,
  },
];
