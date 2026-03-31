export interface AddSourceParams {
  userName: string;
  title?: string;
  status?: string;
}

export interface UpdateSourceParams {
  id: string;
  userName?: string;
  title?: string;
  status?: string;
}

export interface ListSourcesParams {
  filter?: "me" | "public";
  limit?: number;
  direction?: "asc" | "desc";
  exclusiveStartKey?: string;
}

export interface Source {
  id: string;
  userName: string;
  title: string;
  status: string;
  userId?: string;
  sk?: string;
}

export interface ListSourcesResponse {
  items: Source[];
  pagination: {
    direction: "asc" | "desc";
    limit: number;
    hasMore: boolean;
    nextToken: string | null;
  };
}
