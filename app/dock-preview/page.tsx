"use client";

import { AutoHideOnIdle } from "@/components/auto-hide-on-idle";
import { AudiobookPlayerDock } from "../(auth)/convos/audiobook-player/components/audiobook-player-dock";
import { TheDock } from "@/components/the-dock";

export default function DockPreview() {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <AutoHideOnIdle
          hiddenOffset="-100%"
          className="px-4 md:px-12 bg-white/85 backdrop-blur-sm dark:bg-[rgb(9,10,11)]/85"
        >
          <div
            data-testid="top-nav"
            className="z-50 flex justify-between items-center w-full md:mt-2 my-2 py-2"
          >
            <button id="nav-close">Close</button>
            <button id="nav-view">View</button>
          </div>
        </AutoHideOnIdle>
      </div>

      <div className="h-[300vh]">
        <div className="h-64">reading content</div>
        <div className="mt-[150vh]">deep in the transcript</div>
      </div>

      {/* The floating bars (main + character navbar) share this: idle auto-hide */}
      <TheDock className="bottom-2">
        <div className="flex justify-center">
          <div
            id="floating-navbar"
            className="flex items-center gap-6 rounded-full bg-gray-50 px-8 py-2 text-sm shadow-2xl dark:bg-black"
          >
            <button id="nav-home">home</button>
            <button id="nav-convos">convos</button>
            <button id="nav-character">character</button>
          </div>
        </div>
      </TheDock>

      <AudiobookPlayerDock className="bottom-4 sm:bottom-2">
        <div className="p-4 w-full">
          <div className="flex items-center justify-center gap-4">
            <button id="dock-play">Play</button>
            <button id="dock-loop">Loop</button>
          </div>
        </div>
      </AudiobookPlayerDock>
    </div>
  );
}
