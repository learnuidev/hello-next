"use client";

import { NewContent } from "../convos/new-content/new-content";
import { ListenHeader } from "./components/listen-header";
import { MediaList } from "./components/media-list";
import { useListenState } from "./hooks/use-listen-state";

function AddNewBook() {
  return (
    <div className="mx-4 md:mx-32">
      <h4 className="text-center mt-32"> Add new book </h4>
    </div>
  );
}

function AddNewContent() {
  const {
    addNewContent,
    setAddNewContent,
    setAddNewBook,
    addNew,
    setAddNew,
    addNewBook,
  } = useListenState();

  if (addNewContent) {
    return (
      <NewContent
        onClose={() => {
          setAddNewContent(false);
        }}
      />
    );
  }

  if (addNewBook) {
    return <AddNewBook />;
  }

  if (addNew) {
    return (
      <div className="mx-4 md:mx-32">
        <h4 className="text-center mt-32"> What would you like to add </h4>

        <div className="flex justify-center items-center gap-8 text-2xl mt-32">
          <button
            onClick={() => {
              setAddNewBook(true);
            }}
          >
            New Book
          </button>

          <button
            onClick={() => {
              setAddNewContent(true);
            }}
          >
            New Content
          </button>
        </div>
      </div>
    );
  }
}

export default function ListenPage() {
  const { addNew } = useListenState();
  return (
    <div className="m-8">
      <ListenHeader />
      {addNew ? <AddNewContent /> : <MediaList />}
    </div>
  );
}
