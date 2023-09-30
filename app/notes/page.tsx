// import Image from 'next/image'
"use client";

import { Editor } from "@/components/editor";
import { NavBar } from "@/components/navbar";
import { useState } from "react";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    <main className="">
      <NavBar />

      <div className="px-4 md:px-32 md:my-4">
        <Editor content="Hello" id="test" />
      </div>
    </main>
  );
}
