import { pb } from '$lib/pocketbase';
import type {
  EventResponse,
  MediaResponse,
  UsersResponse,
} from '$lib/pocketbase/pocketbase-types.js';
import type { MovieResponse } from '../../../../hooks/movieDbTypes.js';

export async function load({ params }) {
  return {
    event: await pb.collection('event').getOne<
      EventResponse<{
        watching: MediaResponse<MovieResponse>;
        attended?: UsersResponse[];
      }>
    >(params.id, { expand: 'watching,attended' }),
  };
}
