import PocketBase, {
  type ListResult,
  type AuthModel,
  type RecordModel,
  type ListOptions,
} from 'pocketbase';
import { get, readable, type Readable, type Subscriber } from 'svelte/store';
import { browser } from '$app/environment';
import { base } from '$app/paths';
import { goto } from '$app/navigation';

export const pb = new PocketBase(browser ? window.location.origin + '/' + base : undefined);

// Assumes no login as admin
export const authModel = readable<AuthModel>(null, function (set) {
  pb.authStore.onChange((token, model) => {
    set(model as AuthModel);
  }, true);
});

// Auto refresh incase it's expired
if (pb.authStore.isValid) {
  pb.collection('users')
    .authRefresh()
    .catch(() => {
      pb.authStore.clear();
      goto('/');
    });
} else if (get(authModel)) {
  pb.authStore.clear();
  goto('/');
}

/*
 * Save (create/update) a record (a plain object). Automatically converts to
 * FormData if needed.
 */
export async function save<T extends {}, R = RecordModel>(
  collection: string,
  record: T,
  create = false,
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
  queryParams: ListOptions = {},
  {
    subscriptionFilter,
    updateFilter,
  }: {
    subscriptionFilter?: string;
    updateFilter?: (record: T) => boolean;
  } = {},
  page = 1,
  perPage = 20,
): PageStore<T> {
  const collection = pb.collection(idOrName);
  let result: ListResult<T> = { page, perPage, totalItems: 0, totalPages: 0, items: [] };
  let set: Subscriber<ListResult<T>>;
  const store = readable<ListResult<T>>(result, (_set) => {
    set = _set;
    // fetch first page
    collection.getList<T>(page, perPage, queryParams).then((r) => set((result = r)));
    const subscriptions: (() => void)[] = [];
    let stopped = false;
    // watch for changes (only if you're in the browser)
    if (browser) {
      collection
        .subscribe<T>(
          '*',
          ({ action, record }) => {
            set(
              (result = {
                ...result,
                items: (function (action: string) {
                  switch (action) {
                    case 'update':
                      if (updateFilter && !updateFilter(record)) {
                        return result.items.filter((item) => item.id !== record.id);
                      }

                      return result.items.map((item) => (item.id === record.id ? record : item));
                    case 'create':
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
                })(action),
              }),
            );
          },
          {
            expand: queryParams.expand,
            filter: subscriptionFilter,
          },
        )
        .then((unsubcribe) => {
          if (stopped) {
            unsubcribe();
          } else {
            subscriptions.push(unsubcribe);
          }
        });
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
