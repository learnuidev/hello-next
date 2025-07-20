"use client";

import { AddNewContent } from "./components/add-new-content";
import { ListenHeader } from "./components/listen-header";
import { MediaList } from "./components/media-list";
import { useListenState } from "./hooks/use-listen-state";

export default function ListenPage() {
  const { addNew } = useListenState();
  return (
    <div className="m-8">
      <ListenHeader />
      {addNew ? <AddNewContent /> : <MediaList />}
    </div>
  );
}
