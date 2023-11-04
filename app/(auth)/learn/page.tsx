// import Image from 'next/image'
"use client";

import { Editor } from "@/components/Editor";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { NavBar } from "@/components/navbar";
import { Link } from "@/components/link";

interface CoursePreview {
  title: string;
  description: string;
  links: { href: string; title: string }[];
}

const courses: CoursePreview[] = [
  {
    title: "Mandarin Blueprint",
    description:
      "An Ingenious Step-By-Step Online Course That Makes Learning Simple & Fun",
    links: [
      {
        title: "Get The Blueprint",
        href: "https://www.mandarinblueprint.com/buy-the-blueprint/",
      },
    ],
  },
];

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    <main className="">
      <NavBar />

      <div className="px-4 md:px-32 md:my-16">
        <Editor content="Hello" id="home page" />

        <div className="flex justify-center space-x-4 mt-8">
          <Link
            target="_blank"
            href="https://purple-earl-6c3.notion.site/Nomad-Mandarin-Method-32b6668b8bff47a8b0f48eaca63f0988"
          >
            Read the book
          </Link>
        </div>
      </div>

      <Separator className="border-[1px] w-full border-gray-300 dark:border-gray-800 my-16" />

      <h2 className="text-center uppercase font-bold text-gray-500">
        My Learning Resources
      </h2>

      <div className="flex items-center justfy-between w-full">
        <div className="flex-1 space-y-24 my-16">
          <div className="text-center">
            <h4 className="font-bold text-4xl md:text-5xl capitalize text-center">
              Mandarin Blueprint
            </h4>

            <p className="text-xl font-extralight my-2 text-gray-400">
              An Ingenious Step-By-Step Online Course That Makes Learning Simple
              & Fun
            </p>

            <div className="flex justify-center">
              <Link
                target="_blank"
                href="https://www.mandarinblueprint.com/buy-the-blueprint/"
              >
                Get The Blueprint
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h4 className="font-bold text-4xl md:text-5xl capitalize text-center">
              Street Smart Chinese
            </h4>

            <p className="lowercase text-xl font-extralight my-2 text-gray-400">
              HAVE A CONVERSATION IN CHINESE ON THE STREET WITHIN 10 WEEKS!
            </p>
            <div className="flex justify-center">
              <Link
                target="_blank"
                href="https://streetsmartlanguages.com/chinese/"
              >
                Start Learning
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h4 className="font-bold text-4xl md:text-5xl capitalize text-center">
              Chinese Conversations for Beginners
            </h4>

            <p className="lowercase text-xl font-extralight my-2 text-gray-400">
              This book consists of 30 conversational dialogues for beginner
              students, following a consistent storyline in modern China.
            </p>
            <div className="flex justify-center">
              <Link
                target="_blank"
                href="https://www.linglingmandarin.com/books"
              >
                Start Learning
              </Link>
            </div>
          </div>

          {/* <div className="text-center">
            <h4 className="font-bold text-4xl md:text-6xl lowercase text-center">
              Nomad Mandarin Method
            </h4>

            <p className="lowercase text-xl font-extralight my-2 text-gray-400">
              an interactive and immersive platform designed to help you learn
              mandarin by creatively exploring the world
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                target="_blank"
                href="https://purple-earl-6c3.notion.site/Nomad-Mandarin-Method-32b6668b8bff47a8b0f48eaca63f0988"
              >
                Start Learning
              </Link>
              <Link
                target="_blank"
                href="https://purple-earl-6c3.notion.site/Nomad-Mandarin-Method-32b6668b8bff47a8b0f48eaca63f0988"
              >
                Read the book
              </Link>
            </div>
          </div> */}
        </div>
        {/* <div> YO</div> */}
      </div>
    </main>
  );
}
