// import Image from 'next/image'
"use client";

import { useParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";

export default function Home() {
  const params = useParams() as {
    "character-id": string;
  };
  return (
    <main className="">
      <NavBar />

      <div className="flex justify-between items-center w-full px-4 md:px-40 my-4 md:my-8">
        <h1 className="text-4xl">
          {decodeURIComponent(params?.["character-id"])}
        </h1>
      </div>
    </main>
  );
}
