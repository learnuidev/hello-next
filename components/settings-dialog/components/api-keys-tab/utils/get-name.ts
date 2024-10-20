export const getName = (permissionType: string): string => {
  if (permissionType === "all") {
    return `all-${Date.now()}`;
  }

  if (permissionType === "read-only") {
    return `read-only-${Date.now()}`;
  }

  return `restricted-${Date.now()}`;
};
