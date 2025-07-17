"use client";

import { NewContent } from "../convos/new-content/new-content";
import { ListenHeader } from "./components/listen-header";
import { MediaList } from "./components/media-list";
import { useListenState } from "./hooks/use-listen-state";

export default function ListenPage() {
  const { addNewContent, setAddNewContent } = useListenState();
  return (
    <div className="m-8">
      <ListenHeader />
      {addNewContent ? (
        <NewContent
          onClose={() => {
            setAddNewContent(false);
          }}
        />
      ) : (
        <MediaList />
      )}
    </div>
  );
}
