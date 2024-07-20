"use client";

import { NavBar } from "@/components/navbar";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

  const [show, setShow] = useState(false);

  return (
    <div
      className="p-8"
      //   className="grid h-screen place-content-center bg-neutral-100"
    >
      <div className="grid grid-cols-4 gap-4">
        <div className="border-2 border-white p-4 grid grid-rows-subgrid text-center row-span-3 rounded-xl">
          <h2 className="my-4 text-2xl leading-10">Engineering</h2>

          <p>
            Engineering is a human endeavor and thus it is subject to error.
            Some engineering errors are merely annoying, as when a new concrete
            building develops cracks that blemish it as it settles; some errors
            seem humanly unforgivable, as when a bridge collapses and causes the
            death of those who had taken its soundness for granted. Each age has
            had its share of technological annoyances and structural disasters,
            and one would think engineers might have learned by now from their
            mistakes how to avoid them. But recent years have seen some of the
            most costly structural accidents in terms of human life, misery, and
            anxiety, so that the record presents a confusing image of
            technological advancement that may cause some to ask, “Where is our
            progress?
          </p>

          <div className="aspect-square bg-gray-400 h-44"></div>
        </div>
        <div className="border-2 border-white p-4 grid grid-rows-subgrid text-center row-span-3 rounded-xl">
          <h2 className="my-4 text-2xl leading-10">Engineering</h2>

          <p>
            Engineering is a human endeavor and thus it is subject to error.
            Some engineering errors are merely annoying, as when a new concrete
            building develops cracks that blemish it as it settles; some errors
            seem humanly unforgivable, as when a bridge collapses and causes the
            death of those who had taken its soundness for granted.
          </p>

          <div className="aspect-square bg-gray-400 h-44"></div>
        </div>
        <div className="border-2 border-white p-4 grid grid-rows-subgrid text-center row-span-3 rounded-xl">
          <h2 className="my-4 text-2xl leading-10">Engineering</h2>

          <p>
            Engineering is a human endeavor and thus it is subject to error.
            Some engineering errors are merely annoying, as when a new concrete
            building develops cracks that blemish it as it settles
          </p>

          <div className="aspect-square bg-gray-400 h-44"></div>
        </div>
      </div>
    </div>
  );
}
