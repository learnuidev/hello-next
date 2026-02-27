export interface IContentUnknown {
  id: string;
  sk: string;
  contentId: string;
  input: string;
  createdAt: number;
  userId: string;
}

export interface ListUnknownsRequest {
  contentId: string;
}

export interface AddContentUnknownRequest {
  contentId: string;
  input: string;
}

export interface RemoveContentUnknownRequest {
  contentId: string;
  id: string;
}

export interface ListContentUnknownsResponse {
  items: IContentUnknown[];
  count: number;
  pagination: {
    direction: "asc" | "desc";
    limit: number;
    hasMore: boolean;
    nextToken: string | null;
  };
}
