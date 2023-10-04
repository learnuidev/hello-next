"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import {
  faChartColumn,
  faGraduationCap,
  faMap,
  faMapLocation,
  faTable,
  faTableTree,
} from "@fortawesome/sharp-solid-svg-icons";
import { NomadIcon } from "./ui/icons";

export const NavBar = () => {
  return (
    <div className="flex justify-between items-center w-full px-4 md:px-48 md:my-4">
      <Link href="/">
        <FontAwesomeIcon icon={faMountainSun} />
      </Link>
      <div className="my-4 flex justify-center items-center space-x-8 text-xs md:text-md">
        <Link
          href="/courses"
          className="text-gray-400 hover:text-gray-700 transition text-xl"
        >
          <FontAwesomeIcon icon={faGraduationCap} />
        </Link>
        <Link
          href="/pinyin"
          className="text-gray-400 hover:text-gray-700 transition text-xl"
        >
          <FontAwesomeIcon icon={faTableTree} />
        </Link>
        <Link
          href="/analytics"
          className="text-gray-400 hover:text-gray-700 transition text-xl"
        >
          <FontAwesomeIcon icon={faChartColumn} />
        </Link>
        {/* <Link
          href="/features"
          className="text-gray-400 hover:text-gray-700 transition"
        >
          features
        </Link> */}
        {/* <Link
          href="/notes"
          className="text-gray-400 hover:text-gray-700 transition"
        >
          notes
        </Link> */}
        <Link
          href="/nmm"
          className="text-gray-400 hover:text-gray-700 transition text-xl"
        >
          <NomadIcon />
        </Link>
        <Link
          href="/map"
          className="text-gray-400 hover:text-gray-700 transition text-xl"
        >
          <FontAwesomeIcon icon={faMapLocation} />
        </Link>
      </div>
    </div>
  );
};
