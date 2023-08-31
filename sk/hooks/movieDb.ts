import type * as types from './movieDbTypes';

function toParam(obj: Record<string, string>) {
  return Object.entries(obj)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

function makeRequest(
  accessToken: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  params = {},
  baseUrl = 'https://api.themoviedb.org/3/'
): any {
  return $http.send({
    url:
      baseUrl +
      endpoint +
      (method === 'GET' ? '?' + toParam(params as Record<string, string>) : ''),
    method,
    data: method !== 'GET' ? (JSON.stringify(params) as any) : undefined,
    headers: { 'content-type': 'application/json', Authorization: 'Bearer ' + accessToken },
  }).json;
}

export function searchMovie(
  token: string,
  params: types.SearchMovieRequest
): types.MovieResultsResponse {
  return makeRequest(token, 'GET', 'search/movie', params);
}

export function getMovie(token: string, id: string): types.MovieResponse {
  return makeRequest(token, 'GET', `movie/${id}`);
}

export function getMovieFull(token: string, id: string): types.MovieResponse {
  return makeRequest(token, 'GET', `movie/${id}`, { append_to_response: 'credits' });
}
