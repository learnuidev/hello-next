// import Image from 'next/image'
"use client";

import { Editor } from "@/components/Editor";
import { useState } from "react";

// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { Link } from "@/components/link";
import { SearchPage } from "@/components/search";
import { NavigatorMap } from "@/components/navigator-map";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const router = useRouter();

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    // <main className="">
    //   <NavBar />
    //   {/* <NavigatorMap /> */}

    //   <SearchPage />
    // </main>

    <main className="">
      <NavBar />

      <div className="px-4 md:px-32 md:my-4">
        <Editor content="Hello" id="home page" />
      </div>
    </main>
  );
}
