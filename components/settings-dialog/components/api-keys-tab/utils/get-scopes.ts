import { readOnlyScopes } from "../constants/permissions-list";

export const getScopes = (
  permissionType: string,
  scopes: string[]
): string[] => {
  if (permissionType === "all") {
    return ["*"];
  }

  if (permissionType === "read-only") {
    return readOnlyScopes;
  }

  return scopes.filter((item) => !item?.includes("none"));
};
