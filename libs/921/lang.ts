import { listSubtitlesRaw } from "../youtube/list-subtitles.v2";
import { postProcess } from "./post-process";

export async function nineTwoOneData(returns: any) {
  const returnObj = {} as any;

  // const returnKeys = Object.keys(returns)

  for await (const propertyKey of Object.keys(returns)) {
    const val = await listSubtitlesRaw({
      id: returns[propertyKey]?.id,
      lang: returns[propertyKey]?.lang,
    });
    const processes = returns[propertyKey]?.processes;

    if (processes) {
      returnObj[propertyKey] = postProcess({
        content: val,
        processes,
      });
    } else {
      returnObj[propertyKey] = val;
    }
  }

  return returnObj;
}

export async function nineTwoOneReturns(returns: any, variables = {}) {
  const returnObj = {} as any;

  for await (const propertyKey of Object.keys(returns)) {
    const processes = returns[propertyKey]?.processes;

    if (processes) {
      returnObj[propertyKey] = postProcess({
        content: null,
        processes,
        variables,
      });
    } else {
      returnObj[propertyKey] = null;
    }
  }

  return returnObj;
}
