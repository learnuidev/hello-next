"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ICursorPosition {
  left: number;
  width: number;
  opacity: number;
}

export function AnimatedNavbar() {
  const [position, setPosition] = useState<ICursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [show, setShow] = useState(false);

  return (
    <div
      className="my-4"
      //   className="grid h-screen place-content-center bg-neutral-100"
    >
      <div className="flex justify-center mt-8 mb-32">
        <button onClick={() => setShow(!show)}>Toggle</button>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            exit={{
              y: 20,
              opacity: 0,
              filter: "blur(5px)",
              transition: { ease: "easeIn", duration: 0.12 },
            }}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{
              opacity: 1,
              y: -20,
              filter: "blur(0px)",
              transition: { type: "spring", duration: 0.7 },
            }}
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
          </motion.div>
        )}
      </AnimatePresence>
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

        console.log("data", data);

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

function Cursor({ position }: { position: ICursorPosition }) {
  return (
    <motion.div
      animate={position}
      initial={{
        opacity: 0,
      }}
      className="absolute z-0 h-10 rounded-full bg-white"
    />
  );
}
