"use client";

import { NavBar } from "@/components/navbar";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ICursorPosition {
  left: number;
  width: number;
  opacity: number;
}

export default function Home() {
  const [position, setPosition] = useState<ICursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <div
      className="my-4"
      //   className="grid h-screen place-content-center bg-neutral-100"
    >
      <div
        onMouseLeave={() => {
          setPosition((prevPos) => {
            return {
              ...prevPos,
              opacity: 0,
            };
          });
        }}
        className="relative mx-auto flex w-fit h-12 items-center rounded-full border-2 border-black bg-[rgb(35,36,37)] p-1"
      >
        <Tab setPosition={setPosition}>Home</Tab>
        <Tab setPosition={setPosition}>Create</Tab>
        <Tab setPosition={setPosition}>Library</Tab>
        <Tab setPosition={setPosition}>Explore</Tab>
        <Tab setPosition={setPosition}>Search</Tab>

        <Cursor position={position} />
      </div>
    </div>
  );
}

function Tab({
  children,
  setPosition,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<ICursorPosition>>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const data: DOMRect = ref.current.getBoundingClientRect();

        const { width } = data;

        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3"
    >
      {children}
    </div>
  );
}

function Cursor({ position }: { position: any }) {
  return (
    <motion.div
      animate={position}
      className="absolute z-0 h-10 rounded-full bg-white"
    />
  );
}
