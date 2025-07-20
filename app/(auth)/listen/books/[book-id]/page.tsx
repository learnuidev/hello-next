"use client";

import { useBookParams } from "./hooks/use-book-params";

export default function MediaDetails() {
  const { bookId } = useBookParams();

  return (
    <div>
      <h1>Your book: {bookId} </h1>
    </div>
  );
}
