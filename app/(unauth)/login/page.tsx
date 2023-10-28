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

import { Login } from "@/components/Login";

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
      <Login />
    </main>
  );
}
