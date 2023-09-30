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

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const router = useRouter();

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

        <p className="text-xl font-extralight my-2 text-gray-400 px-8">
          an interactive and immersive platform designed to help you learn mandarin by creatively exploring the world
        </p>
        <div className="flex justify-center my-8">
          <Link
            href="https://purple-earl-6c3.notion.site/Nomad-Mandarin-Method-32b6668b8bff47a8b0f48eaca63f0988"
            target={"_blank"}
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}
