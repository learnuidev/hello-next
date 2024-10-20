export const defaultPermissionType = "all";
export const permissionTypes = [
  { id: "all", title: "All" },
  { id: "restricted", title: "Restricted" },
  { id: "read-only", title: "Read Only" },
];

export const permissionsList = [
  {
    title: "Components",
    description: "Retrieve Components",

    scopesList: [
      { id: "component.none", title: "None" },
      { id: "component.read", title: "Read" },
      { id: "component.write", title: "Write" },
    ],
    endpointsList: ["/v1/list-components", "/v1/discover"],
  },
  {
    title: "Characters",
    description: "Create and manage characters",
    scopesList: [
      { id: "character.none", title: "None" },
      { id: "character.read", title: "Read" },
      { id: "character.write", title: "Write" },
    ],
    endpointsList: [
      "/v1/list-characters",
      "/v1/get-character",
      "/v1/add-character",
      "/v1/update-character",
      "/v1/delete-character",
    ],
  },
  {
    title: "Content Management",
    description: "Create and manage content",

    scopesList: [
      { id: "content.none", title: "None" },
      { id: "content.read", title: "Read" },
      { id: "content.write", title: "Write" },
    ],
    endpointsList: [
      "/v1/list-contents",
      "/v1/get-content",
      "/v1/add-content",
      "/v1/update-content",
      "/v1/delete-content",
    ],
  },
  {
    title: "AI",
    description:
      "Discover new components, perform grammar analysis, gen sentences and more",

    scopesList: [
      { id: "ai.none", title: "None" },
      { id: "ai.read", title: "Read" },
      { id: "ai.write", title: "Write" },
    ],
    endpointsList: [
      "/v1/gen-sentences",
      "/v1/list-sentences",
      "/v1/get-summary",
      "/v1/get-meaning",
    ],
  },
  {
    title: "Search",
    description: "Perform Search",
    scopesList: [
      { id: "search.none", title: "None" },
      { id: "search.read", title: "Read" },
    ],
    endpointsList: ["/v1/search"],
    enabled: false,
  },
  {
    title: "Analytics",
    description: "Get Analytics",
    scopesList: [
      { id: "analytics.none", title: "None" },
      { id: "analytics.read", title: "Read" },
    ],
    endpointsList: ["/v1/list-analytics", "/v1/get-analytics"],
    enabled: false,
  },
  {
    title: "Review System",
    description: "Create and manage reviews",
    scopesList: [
      { id: "review.none", title: "None" },
      { id: "review.read", title: "Read" },
      { id: "review.write", title: "Write" },
    ],
    endpointsList: ["/v1/list-reviews", "/v1/get-review", "/v1/perform-review"],
    enabled: false,
  },
];

const getScopesByType = (type: string) => {
  return permissionsList
    .map((x) => x.scopesList)
    .flat()
    .map((x) => x.id)
    .filter((item) => item?.includes(type));
};

export const isNoneOnlyScope = (scope: string): boolean => {
  return scope?.includes("none");
};

export const noneOnlyScopes = getScopesByType("none");
export const readOnlyScopes = getScopesByType("read");
