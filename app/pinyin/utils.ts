import { characterDictionary } from "./data";
export const getGraph = (hanzi: string) => {
  return Object.entries(characterDictionary)?.find((value) => {
    const val = value[1] as any;
    return val?.graph?.includes(hanzi);
  })?.[1] as {
    graph: string
  }
};
