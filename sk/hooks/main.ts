import type { getMovieFull as GM } from './movieDb';
import type { MovieResponse } from './movieDbTypes';

routerAdd('GET', '/api/search', (c) => {
  const auth = c.get('authRecord');
  if (!auth) throw new ForbiddenError('Not authorized');

  const token = $os.getenv('TMDB_ACCESS_TOKEN');

  const { searchMovie } = require('./pb_hooks/movieDb');

  const query = c.queryParam('q');
  const res = searchMovie(token, { query });
  return c.json(200, res);
});

routerAdd('GET', '/api/movie/:id', (c) => {
  const auth = c.get('authRecord') as { id: string } | undefined;
  if (!auth) throw new ForbiddenError('Not authorized');

  const token = $os.getenv('TMDB_ACCESS_TOKEN');
  const { getMovieFull } = require('./pb_hooks/movieDb') as { getMovieFull: typeof GM };
  const movie = getMovieFull(token, c.pathParam('id')) as MovieResponse & {
    expand?: Record<string, any>;
  };

  // Get record from database
  const dao = $app.dao()!;
  const result = new DynamicModel({
    id: '',
  }) as { id: string };

  const movieResult = new DynamicModel({
    id: '',
  }) as { id: string };

  try {
    dao
      .db()
      .select('id')
      ?.from('media')
      ?.where($dbx.exp('type = "movie"'))
      ?.andWhere($dbx.exp('tmdb_id = {:id}', { id: movie.id }))
      ?.one(result);

    movie.expand = {
      id: result.id,
    };

    dao
      .db()
      .select('id')
      ?.from('user_media')
      ?.where($dbx.exp('media = {:mediaId}', { mediaId: result.id }))
      ?.andWhere($dbx.exp('user = {:authId}', { authId: auth.id }))
      ?.one(movieResult);

    movie.expand.user_media = dao.findRecordsByExpr(
      'user_media',
      $dbx.exp('media = {:mediaId}', { mediaId: result.id }),
      $dbx.exp('user = {:authId}', { authId: auth.id })
    )?.[0];
  } catch (e) {}

  return c.json(200, movie);
});

routerAdd('POST', '/api/movie/resolve/:id', (c) => {
  const auth = c.get('authRecord');
  if (!auth) throw new ForbiddenError('Not authorized');

  const dao = $app.dao()!;

  const result = new DynamicModel({
    id: '',
  }) as { id: string };

  try {
    dao
      .db()
      .select('id')
      ?.from('media')
      ?.where($dbx.exp('type = "movie"'))
      ?.andWhere($dbx.exp('tmdb_id = {:id}', { id: c.pathParam('id') }))
      ?.one(result);

    return c.json(200, result.id);
  } catch (e) {}

  const token = $os.getenv('TMDB_ACCESS_TOKEN');
  const { getMovie } = require('./pb_hooks/movieDb') as { getMovie: typeof GM };

  const movie = getMovie(token, c.pathParam('id'));

  const collection = dao.findCollectionByNameOrId('media');
  // Create record without validation
  const record = new Record(collection, {
    tmdb_id: movie.id,
    metadata: movie,
    type: 'movie',
  });
  dao.saveRecord(record);

  return c.json(200, record.id);
});
