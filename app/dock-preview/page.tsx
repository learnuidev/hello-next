"use client";

import { AudiobookPlayerDock } from "../(auth)/convos/audiobook-player/components/audiobook-player-dock";

export default function DockPreview() {
  return (
    <div className="h-screen">
      <AudiobookPlayerDock className="bottom-4 sm:bottom-2">
        <div className="p-4 w-full">
          <div className="flex items-center justify-center gap-4">
            <button>Play</button>
            <button>Loop</button>
          </div>
        </div>
      </AudiobookPlayerDock>
    </div>
  );
}
