"use client";

import { NavBar } from "@/components/navbar";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  return (
    <div className="grid h-screen place-content-center bg-neutral-100">
      <div className="relative mx-auto flex w-fit h-10 items-center rounded-full border-2 border-black bg-white p-1">
        <Tab>Home</Tab>
        <Tab>Pricing</Tab>
        <Tab>Features</Tab>
        <Tab>Docs</Tab>
        <Tab>Blog</Tab>

        <Cursor />
      </div>
    </div>
  );
}

function Tab({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 mx-4">
      {children}
    </li>
  );
}

function Cursor() {
  return <div className="absolute z-0 h-8 w-24 rounded-full bg-black" />;
}
