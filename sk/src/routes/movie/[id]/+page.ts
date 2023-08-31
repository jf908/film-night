import { pb } from '$lib/pocketbase';
import type { UserMediaResponse } from '$lib/pocketbase/pocketbase-types.js';
import type { CreditsResponse, MovieResponse } from '../../../../hooks/movieDbTypes.js';

export async function load({ params }) {
  return {
    movie: (await pb.send(`/api/movie/${params.id}`, {})) as MovieResponse & {
      credits: CreditsResponse;
      expand?: {
        id?: string;
        user_media?: UserMediaResponse;
      };
    },
  };
}
