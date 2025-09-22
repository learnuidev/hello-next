"use client";

import { SearchBar } from "@/components/search-bar";
import { BooksList } from "./components/books-list";

export default function BooksPage() {
  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <div className="w-full flex justify-start">
        <SearchBar />
      </div>

      <BooksList />
    </div>
  );
}
