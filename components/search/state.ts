import { create } from "zustand";

// const [query, setQuery] = useState('')
// const [index, setIndex] = useState(0)
// const [queryResult, setQueryResult] = useState<any>(null)

export const useSearchQueryStore = create((set: any, get: any) => ({
  type: "character",
  setType: (f: any) =>
    typeof f === "function" ? set({ type: f(get().type) }) : set({ type: f }),
  querySync: "",
  setQuerySync: (f: any) =>
    typeof f === "function"
      ? set({ querySync: f(get().querySync) })
      : set({ querySync: f }),
  query: "",
  setQuery: (f: any) =>
    typeof f === "function"
      ? set({ query: f(get().query) })
      : set({ query: f }),
  query2: "",
  setQuery2: (f: any) =>
    typeof f === "function"
      ? set({ query2: f(get().query2) })
      : set({ query2: f }),
  queryResult: null,
  dictionary: null,
  setQueryResult: (f: any) =>
    typeof f === "function"
      ? set({ queryResult: f(get().queryResult) })
      : set({ queryResult: f }),
  nepaliQueryResult: null,
  setNepaliQueryResult: (f: any) =>
    typeof f === "function"
      ? set({ nepaliQueryResult: f(get().nepaliQueryResult) })
      : set({ nepaliQueryResult: f }),
  setDictionary: (f: any) =>
    typeof f === "function"
      ? set({ dictionary: f(get().dictionary) })
      : set({ dictionary: f }),
}));
