// import Image from 'next/image'
"use client";

import { Editor } from "@/components/Editor";
import { useState } from "react";

// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { useRouter, useSearchParams } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { Link } from "@/components/link";
import { SearchPage } from "@/components/search";
import { NavigatorMap } from "@/components/navigator-map";
import { SearchResult } from "@/components/search-result";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("query") || "";

  const router = useRouter();

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    <main className="">
      <NavBar />
      <SearchResult
        onSearchGrammar={(grammar) => {
          router.push(`/nmm/${grammar}`);

          // router.push()
        }}
        query={searchQuery}
      />
    </main>
  );
}
