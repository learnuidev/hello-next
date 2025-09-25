import { Config } from "../datafast.types";

// ========== CONFIGURATION & INITIALIZATION ==========
export const getConfig = (): Config => {
  const currentScript = document.currentScript as HTMLScriptElement;
  const dataPrefix = "data-";
  const getScriptAttribute = currentScript.getAttribute.bind(currentScript);

  return {
    currentScript,
    dataPrefix,
    getScriptAttribute,
  };
};
