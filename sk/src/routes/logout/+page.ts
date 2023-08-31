import { pb } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';

export async function load() {
  pb.authStore.clear();
  throw redirect(302, '/');
}
