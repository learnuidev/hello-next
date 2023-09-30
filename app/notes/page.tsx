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
      <Editor content="Hello" id="test" />
    </main>
  );
}
