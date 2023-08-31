import { pb } from './pocketbase';

export async function resolveMovie(id: number): Promise<string> {
  return pb.send(`/api/movie/resolve/${id}`, { method: 'POST' });
}
