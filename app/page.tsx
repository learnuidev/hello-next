// import Image from 'next/image'
"use client";

import { Editor } from "@/components/Editor";
import { useState } from "react";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    <main className="">
      <div>
        <h1 className="text-gray-300 my-4 font-bold text-xl lowercase text-center">
          Nomad Method
        </h1>
      </div>
      <Editor content="Hello" id="test" />
    </main>
  );
}
