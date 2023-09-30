"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";

export const NavBar = () => {
  return (
    <div className="flex justify-between items-center w-full px-4 md:px-48 md:my-4">
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
          href="/features"
          className="text-gray-400 hover:text-gray-700 transition"
        >
          features
        </Link>
        <Link
          href="/notes"
          className="text-gray-400 hover:text-gray-700 transition"
        >
          notes
        </Link>
      </div>
    </div>
  );
};
