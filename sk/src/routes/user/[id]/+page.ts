import { pb } from '$lib/pocketbase';
import type { UsersResponse } from '$lib/pocketbase/pocketbase-types.js';

export async function load({ params }) {
  return {
    user: await pb.collection('users').getOne<UsersResponse>(params.id),
  };
}
