export const validatePropertyName = (key: string): boolean =>
  typeof key === "string" &&
  key.length > 0 &&
  key.length <= 32 &&
  /^[a-z0-9_-]+$/.test(key.toLowerCase());
