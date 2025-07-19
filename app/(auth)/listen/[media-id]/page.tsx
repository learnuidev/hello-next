"use client";

import { Icons } from "@/components/ui/icons.v2";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Reader } from "./components/reader";
import { RoundButton } from "./components/round-button";
import { UploadAudioButtonListen } from "./components/upload-audio-button-listen";
import { useMediaParams } from "./hooks/use-media-params";
import { useGetMediaQuery } from "../hooks/use-get-media-query";
import { useMediaState } from "./hooks/use-media-state";
import { useContainsHumanMode } from "./hooks/use-contains-human-mode";
import { MediaSettingsDialog } from "./components/media-settings-dialog/media-settings-dialog";

function ListenAnalytics() {
  return <main className="max-w-6xl m-auto p-4">todo</main>;
}
function ListenSettings() {
  const { mediaId } = useMediaParams();
  return (
    <main className="max-w-6xl m-auto p-4">
      <section className="mt-[72px] h-auto sm:min-h-[800px] rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
        <h2 className="text-2xl text-center pt-8"> Settings</h2>

        <div>
          <h3 className="mt-4 px-12">
            <UploadAudioButtonListen
              mediaId={mediaId}
              text={"Add a new audio"}
            />
          </h3>
        </div>
      </section>
    </main>
  );
}

function ListenViewType({ view }: { view: string }) {
  switch (view) {
    case "reader":
    default:
      return <Reader />;
    case "analytics":
      return <ListenAnalytics />;
    case "settings":
      return <ListenSettings />;
  }
}
export default function MediaDetails() {
  const [view, setView] = useState("reader");
  const { mediaId } = useMediaParams();

  const { data } = useGetMediaQuery(mediaId);

  const [showMenu, setShowMenu] = useState(false);

  const { theme, setTheme } = useTheme();

  const { mode, setMode } = useMediaState();

  const containsHumanMode = useContainsHumanMode(mediaId);

  return (
    <div className="relative">
      <ListenViewType view={view} />

      <MediaSettingsDialog
        isOpen={showMenu}
        closeDialog={() => {
          setShowMenu(false);
        }}
      />

      <div className="absolute right-20 top-56">
        <div className="flex flex-col gap-8">
          <RoundButton
            onClick={() => {
              setShowMenu((showMenu) => !showMenu);
            }}
          >
            <Icons.bars className="text-xl" />
          </RoundButton>
          <RoundButton
            onClick={() => {
              if (theme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
          >
            {theme === "dark" ? (
              <Icons.lightBulbOn className="text-2xl" />
            ) : (
              <Icons.moon className="text-2xl" />
            )}
          </RoundButton>
          <RoundButton
            onClick={() => {
              setView((prev) =>
                prev === "analytics" ? "reader" : "analytics"
              );
            }}
          >
            <Icons.chartColumn className="text-2xl" />
          </RoundButton>
          <RoundButton
            onClick={() => {
              setView((prev) => (prev === "settings" ? "reader" : "settings"));
            }}
          >
            <Icons.gearLight className="text-2xl" />
          </RoundButton>
          {containsHumanMode && (
            <RoundButton
              onClick={() => {
                if (mode === "ai") {
                  setMode("human");
                } else {
                  setMode("ai");
                }
              }}
            >
              {mode === "ai" ? (
                <Icons.astronaut className="text-2xl" />
              ) : (
                <Icons.robot2 className="text-2xl" />
              )}
            </RoundButton>
          )}
        </div>
      </div>
    </div>
  );
}
