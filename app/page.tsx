// import Image from 'next/image'
"use client";

import { Editor } from "@/components/editor";
import { useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMountainSun } from '@fortawesome/pro-duotone-svg-icons/faMountainSun'
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const router = useRouter()

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    <main className="">
      <NavBar />

      <div className="text-center">
        <h1 className="mt-32 font-bold text-4xl md:text-6xl lowercase text-center">
          Nomad Method
        </h1>

        <p className="text-xl font-extralight my-2 text-gray-400">
          an interactive platform designed to help you learn mandarin by exploring the world
        </p>
        <div className="flex justify-center my-8">
          <Button
          onClick={() => {
            router.push("/learn")
          }}
            variant="ghost"
            className="bg-black text-gray-200 font-extralight"
          >
            {" "}
            Learn More 
          </Button>
        </div>
      </div>
    </main>
  );
}
