"use client";

import { createIndexDBStore } from "@/libs/index-db/index-db";

export const usePreviousPathNameStore = createIndexDBStore({
  name: "previous-path-name",
  handler: (set: any, get: any) => ({
    pathname: null,
    setPathName: (f: any) =>
      typeof f === "function"
        ? set({ pathname: f(get().pathname) })
        : set({ pathname: f }),
  }),
});

export const usePreviousPathnameStore = () => {
  const previousPath: any = usePreviousPathNameStore((state) => state.pathname);
  const setPreviousPath = usePreviousPathNameStore(
    (state) => state.setPathName
  );

  return { previousPath, setPreviousPath };
};
