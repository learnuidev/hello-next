// import Image from 'next/image'
"use client";

import { Editor } from "@/components/Editor";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { NavBar } from "@/components/NavBar";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    <main className="">
      <NavBar />
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="mt-32 font-bold text-4xl md:text-6xl lowercase text-center">
            Mandarin Blueprint
          </h1>

          <p className="text-xl font-extralight my-2 text-gray-400">
            An Ingenious Step-By-Step Online Course That Makes Learning Simple &
            Fun
          </p>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              className="bg-black text-gray-200 font-extralight"
            >
              Get The Blueprint
            </Button>
          </div>
        </div>
        <div className="text-center">
          <h1 className="mt-32 font-bold text-4xl md:text-6xl lowercase text-center">
            Street Smart Chinese
          </h1>

          <p className="lowercase text-xl font-extralight my-2 text-gray-400">
            HAVE A CONVERSATION IN CHINESE ON THE STREET WITHIN 10 WEEKS!
          </p>
          <div className="flex justify-center">
            <Button
              variant="ghost"
              className="bg-black text-gray-200 font-extralight"
            >
              Start Learning
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
