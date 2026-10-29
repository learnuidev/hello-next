"use client";

import Link from "next/link";
import { Icons } from "../ui/icons.v2";
import { ReaderThemeToggle } from "@/app/(auth)/reader/components/reader-theme-toggle";

export const LandingNavbar = () => {
  return (
    <nav className="flex justify-between items-center w-full px-4 md:px-12 my-2 md:my-6">
      <div className="flex space-x-2 md:space-x-8 items-center">
        <Link href="/">
          <Icons.mandarin className="text-xl hover:text-rose-400 transition" />
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <ReaderThemeToggle />

        <Link
          href="/login"
          className="flex items-center text-sm space-x-2 hover:text-rose-400 transition"
        >
          <Icons.fingerPrint className="" />
          <p>Login</p>
        </Link>
      </div>
    </nav>
  );
};
