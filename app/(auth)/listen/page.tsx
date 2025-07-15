"use client";

import { ListenHeader } from "./components/listen-header";
import { MediaList } from "./components/media-list";

export default function ListenPage() {
  return (
    <div className="m-8">
      <ListenHeader />
      <MediaList />
    </div>
  );
}
