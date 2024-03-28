// import Image from 'next/image'
"use client";

import { useAnalyrizeLyricsQuery } from "@/domain/sentence/analyze-lyrics.queries";
import { useSearchParams } from "next/navigation";

export default function Lyrics() {
  const searchParams = useSearchParams();

  const lyrics = searchParams.get("lyrics");

  const { data: lyricsData } = useAnalyrizeLyricsQuery({
    lyrics: lyrics || "",
  });

  if (!lyrics) {
    return (
      <div>
        <input />
      </div>
    );
  }

  return (
    <main className="">
      <h1>Lyrics Analyzer</h1>

      <p>{lyrics}</p>

      <code>
        <pre>{JSON.stringify(lyricsData, null, 2)}</pre>
      </code>
    </main>
  );
}
