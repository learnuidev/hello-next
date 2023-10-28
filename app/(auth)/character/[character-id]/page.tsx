// import Image from 'next/image'
"use client";

import { Editor } from "@/components/Editor";
import { useState } from "react";

// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { useParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { Link } from "@/components/link";
import { SearchPage } from "@/components/search";
import { NavigatorMap } from "@/components/navigator-map";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const params = useParams() as {
    "character-id": string;
  };
  return (
    <main className="">
      <NavBar />

      <div className="flex justify-between items-center w-full px-4 md:px-40 my-4 md:my-8">
        <h1 className="text-4xl">{decodeURIComponent(params?.["character-id"])}</h1>
        {/* <h1 className="text-4xl">{decodeURIComponent(params?.["character-id"])}</h1> */}
      </div>
      {/* <SearchPage /> */}
    </main>
  );
}
