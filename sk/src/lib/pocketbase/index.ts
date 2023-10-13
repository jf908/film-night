import PocketBase, { ListResult, Record as PBRecord, type Admin, Record } from 'pocketbase';
import { readable, type Readable, type Subscriber } from 'svelte/store';
import { browser } from '$app/environment';
import { base } from '$app/paths';

export const pb = new PocketBase(browser ? window.location.origin + '/' + base : undefined);

// Assumes no login as admin
export const authModel = readable<PBRecord | null>(null, function (set) {
  pb.authStore.onChange((token, model) => {
    set(model as PBRecord | null);
  }, true);
});

// Auto refresh incase it's expired
if (pb.authStore.isValid) {
  pb.collection('users')
    .authRefresh()
    .catch(() => {
      pb.authStore.clear();
    });
}

/*
 * Save (create/update) a record (a plain object). Automatically converts to
 * FormData if needed.
 */
export async function save<T extends {}, R = Record>(
  collection: string,
  record: T,
  create = false
) {
  // convert obj to FormData in case one of the fields is instanceof FileList
  const data = object2formdata(record);
  if ('id' in record && typeof record.id === 'string' && !create) {
    // "create" flag overrides update
    return await pb.collection(collection).update<R>(record.id, data);
  } else {
    return await pb.collection(collection).create<R>(data);
  }
}

// convert obj to FormData in case one of the fields is instanceof FileList
function object2formdata(obj: {}) {
  // check if any field's value is an instanceof FileList
  if (!Object.values(obj).some((val) => val instanceof FileList || val instanceof File)) {
    // if not, just return the original object
    return obj;
  }
  // otherwise, build FormData from obj
  const fd = new FormData();
  for (const [key, val] of Object.entries(obj)) {
    if (val instanceof FileList) {
      for (const file of val) {
        fd.append(key, file);
      }
    } else if (val instanceof File) {
      // handle File before "object" so that it doesn't get serialized as JSON
      fd.append(key, val);
    } else if (typeof val === 'object') {
      fd.append(key, JSON.stringify(val));
    } else {
      fd.append(key, val as any);
    }
  }
  return fd;
}

export interface PageStore<T = any> extends Readable<ListResult<T>> {
  setPage(newpage: number): Promise<void>;
  next(): Promise<void>;
  prev(): Promise<void>;
  setFilter(filter: string): Promise<void>;
}

export function watch<T extends { id?: string }>(
  idOrName: string,
  queryParams = {} as any,
  {
    additionalSubscriptions,
    overrideSubscriptionCollection,
    updateFilter,
  }: {
    additionalSubscriptions?: { collection: string; key: string }[];
    updateFilter?: (record: T) => boolean;
    overrideSubscriptionCollection?: string;
  } = {},
  page = 1,
  perPage = 20
): PageStore<T> {
  const collection = pb.collection(idOrName);
  let result = new ListResult(page, perPage, 0, 0, [] as T[]);
  let set: Subscriber<ListResult<T>>;
  const store = readable<ListResult<T>>(result, (_set) => {
    set = _set;
    // fetch first page
    collection.getList<T>(page, perPage, queryParams).then((r) => set((result = r)));
    const subscriptions: (() => void)[] = [];
    let stopped = false;
    // watch for changes (only if you're in the browser)
    if (browser) {
      async function expand(expand: any, record: any) {
        return expand ? await collection.getOne(record.id, { expand }) : record;
      }
      (overrideSubscriptionCollection ? pb.collection(overrideSubscriptionCollection) : collection)
        .subscribe<T>('*', ({ action, record }) => {
          (async function (action: string) {
            // see https://github.com/pocketbase/pocketbase/discussions/505
            switch (action) {
              case 'update':
                record = await expand(queryParams.expand, record);

                if (updateFilter && !updateFilter(record)) {
                  return result.items.filter((item) => item.id !== record.id);
                }

                return result.items.map((item) => (item.id === record.id ? record : item));
              case 'create':
                record = await expand(queryParams.expand, record);
                const index = result.items.findIndex((r) => r.id === record.id);
                // replace existing if found, otherwise append
                if (index >= 0) {
                  result.items[index] = record;
                  return result.items;
                } else {
                  return [...result.items, record];
                }
              case 'delete':
                return result.items.filter((item) => item.id !== record.id);
            }
            return result.items;
          })(action).then((items) => set((result = { ...result, items })));
        })
        .then((unsubcribe) => {
          if (stopped) {
            unsubcribe();
          } else {
            subscriptions.push(unsubcribe);
          }
        });

      if (expand) {
        additionalSubscriptions?.forEach(({ collection: collectionName, key }) => {
          const collection = pb.collection(collectionName);

          collection
            .subscribe('*', ({ action, record: voteRecord }) => {
              (async function (action: string) {
                // see https://github.com/pocketbase/pocketbase/discussions/505
                switch (action) {
                  case 'update': {
                    const record = await expand(queryParams.expand, { id: voteRecord[key] });
                    return result.items.map((item) => (item.id === record.id ? record : item));
                  }
                  case 'create': {
                    const record = await expand(queryParams.expand, { id: voteRecord[key] });
                    const index = result.items.findIndex((r) => r.id === record.id);
                    // replace existing if found, otherwise append
                    if (index >= 0) {
                      result.items[index] = record;
                      return result.items;
                    } else {
                      return [...result.items, record];
                    }
                  }
                  // Let's hope we never need this
                  // case 'delete':
                  // 	return result.items.filter((item) => item.id !== record.id);
                }
                return result.items;
              })(action).then((items) => set((result = { ...result, items })));
            })
            .then((unsubcribe) => {
              if (stopped) {
                unsubcribe();
              } else {
                subscriptions.push(unsubcribe);
              }
            });
        });
      }
    }

    return () => {
      stopped = true;
      subscriptions.forEach((unsubscribe) => unsubscribe());
    };
  });
  async function setPage(newpage: number) {
    const { page, totalPages, perPage } = result;
    if (page > 0 && page <= totalPages) {
      set((result = await collection.getList(newpage, perPage, queryParams)));
    }
  }
  return {
    ...store,
    setPage,
    async setFilter(filter: string) {
      queryParams.filter = filter;
      set((result = await collection.getList(result.page, perPage, queryParams)));
    },
    async next() {
      setPage(result.page + 1);
    },
    async prev() {
      setPage(result.page - 1);
    },
  };
}
