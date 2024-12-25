import { create, StateCreator } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval"; // can use anything: IndexedDB, Ionic Storage, etc.

// Custom storage object
export const indexDBStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved");
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, "has been deleted");
    await del(name);
  },
};

export const createIndexDBStore = <T extends object>({
  name,
  handler,
}: {
  name: string;
  handler: StateCreator<T>;
}) =>
  create(
    persist(handler, {
      name, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => indexDBStorage), // (optional) by default, 'localStorage' is used
    })
  );
