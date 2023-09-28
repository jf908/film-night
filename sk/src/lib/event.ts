import type { MovieResponse } from '../../hooks/movieDbTypes';
import type { EventResponse, MediaResponse, UsersResponse } from './pocketbase/pocketbase-types';

export type FullEvent = EventResponse<{
  watching: MediaResponse<MovieResponse>;
  attended?: UsersResponse[];
}>;
