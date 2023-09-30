// import Image from 'next/image'
"use client";

import { Editor } from "@/components/Editor";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    <main className="">
      <div className="flex justify-between items-center w-full px-4 md:px-32 lg:px-48 md:my-4">
        <Link href="/">
          <FontAwesomeIcon icon={faMountainSun} />
        </Link>
        <div className="my-4 flex justify-center items-center space-x-4 text-xs md:text-md">
          <Link
            href="/courses"
            className="text-gray-400 hover:text-gray-700 transition"
          >
            courses
          </Link>
          <Link
            href="/pinyin"
            className="text-gray-400 hover:text-gray-700 transition"
          >
            pinyin
          </Link>
          <Link
            href="/notes"
            className="text-gray-400 hover:text-gray-700 transition"
          >
            notes
          </Link>
        </div>
      </div>
      <div className="text-center">
        <h1 className="mt-32 font-bold text-4xl md:text-6xl lowercase text-center">
          Courses
        </h1>

        <p className="text-xl font-extralight my-2 text-gray-400">
          coming soon
        </p>
        {/* <div className="flex justify-center my-8">
          <Button
            variant="ghost"
            className="bg-black text-gray-200 font-extralight"
          >
  
            Start Learning
          </Button>
        </div> */}
      </div>
    </main>
  );
}
