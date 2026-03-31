export interface AddSourceParams {
  userName: string;
}

export interface Source {
  id: string;
  userName: string;
  title: string;
  status: string;
  // status: "claimed" | "unclaimed";
}
