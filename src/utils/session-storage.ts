class SessionStorage {
  storage: Map<string, unknown> = new Map();

  setItem(key: string, value: unknown) {
    this.storage.set(key, value);
  }

  getItem(key: string) {
    return this.storage.get(key);
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }

  clear() {
    this.storage.clear();
  }
}

export const sessionStorage = new SessionStorage();
