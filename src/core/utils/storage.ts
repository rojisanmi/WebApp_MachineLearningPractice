/**
 * Storage Utilities — Safe localStorage/sessionStorage with JSON parsing
 */

interface StorageOptions {
  /** Prefix for all keys to avoid collisions */
  prefix?: string;
  /** Use sessionStorage instead of localStorage */
  session?: boolean;
  /** Custom serializer */
  serialize?: (value: unknown) => string;
  /** Custom deserializer */
  deserialize?: (value: string) => unknown;
}

const defaultOptions: Required<StorageOptions> = {
  prefix: 'ml-lab.',
  session: false,
  serialize: JSON.stringify,
  deserialize: JSON.parse,
};

function getStorage(session: boolean): Storage {
  return session ? sessionStorage : localStorage;
}

function makeKey(key: string, prefix: string): string {
  return `${prefix}${key}`;
}

function isStorageAvailable(storage: Storage): boolean {
  try {
    const test = '__storage_test__';
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/** Create a namespaced storage instance */
export function createStorage(options: StorageOptions = {}): StorageAPI {
  const opts = { ...defaultOptions, ...options };
  const storage = getStorage(opts.session);
  const available = isStorageAvailable(storage);

  return {
    get<T>(key: string, fallback: T): T {
      if (!available) return fallback;
      try {
        const raw = storage.getItem(makeKey(key, opts.prefix));
        if (raw === null) return fallback;
        return opts.deserialize(raw) as T;
      } catch {
        return fallback;
      }
    },

    set<T>(key: string, value: T): boolean {
      if (!available) return false;
      try {
        storage.setItem(makeKey(key, opts.prefix), opts.serialize(value));
        return true;
      } catch {
        return false;
      }
    },

    remove(key: string): boolean {
      if (!available) return false;
      try {
        storage.removeItem(makeKey(key, opts.prefix));
        return true;
      } catch {
        return false;
      }
    },

    clear(): boolean {
      if (!available) return false;
      try {
        const keys = Object.keys(storage).filter(k => k.startsWith(opts.prefix));
        keys.forEach(k => storage.removeItem(k));
        return true;
      } catch {
        return false;
      }
    },

    has(key: string): boolean {
      if (!available) return false;
      return storage.getItem(makeKey(key, opts.prefix)) !== null;
    },

    keys(): string[] {
      if (!available) return [];
      return Object.keys(storage)
        .filter(k => k.startsWith(opts.prefix))
        .map(k => k.slice(opts.prefix.length));
    },
  };
}

export interface StorageAPI {
  get<T>(key: string, fallback: T): T;
  set<T>(key: string, value: T): boolean;
  remove(key: string): boolean;
  clear(): boolean;
  has(key: string): boolean;
  keys(): string[];
}

/** Default storage instance */
export const storage = createStorage();

/** Storage for user preferences (persistent) */
export const prefs = createStorage({ prefix: 'ml-lab.prefs.' });

/** Storage for temporary session data */
export const session = createStorage({ prefix: 'ml-lab.session.', session: true });