"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { NavBar } from "@/components/navbar";

import { SearchResult } from "@/components/search-result";

export default function Home() {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("query") || "";

  const router = useRouter();

  return (
    <main className="">
      <NavBar />
      <SearchResult
        onSearchGrammar={(grammar) => {
          router.push(`/nmm/${grammar}`);
        }}
        query={searchQuery}
      />
    </main>
  );
}
