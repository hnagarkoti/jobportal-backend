import { Candidates } from './candidate.entity';
import { CANDIDATES_REPOSITORY } from '../../core/constants';

export const candidatesProviders = [
  {
    provide: CANDIDATES_REPOSITORY,
    useValue: Candidates,
  },
];
