"use client";

import { Icons } from "@/components/ui/icons.v2";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Reader } from "./reader";
import { RoundButton } from "./round-button";

import { useMediaParams } from "../hooks/use-media-params";
import { useGetMediaQuery } from "../../hooks/use-get-media-query";
import { useMediaState } from "../hooks/use-media-state";
import { useContainsHumanMode } from "../hooks/use-contains-human-mode";
import { MediaSettingsDialog } from "./media-settings-dialog/media-settings-dialog";
import useSound from "use-sound";
import { ListenAnalytics } from "./listen-analytics/listen-analytics";
import { MediaLinksDialog } from "./media-links-dialog/media-links-dialog";
import { cn } from "@/lib/utils";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";

const switchUrl = `https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.us-east-1.amazonaws.com/learnuidev@gmail.com/01JH6X1JMEACXMV4CY8ZSHTC0D.m4a`;

function ListenViewType({
  view,
  mediaId,
  playNext,
  autoPlay = false,
}: {
  view: string;
  mediaId: string;
  playNext?: () => void;
  autoPlay?: boolean;
}) {
  switch (view) {
    case "reader":
    default:
      return (
        <Reader mediaId={mediaId} autoPlay={autoPlay} playNext={playNext} />
      );
    case "analytics":
      return <ListenAnalytics mediaId={mediaId} />;
  }
}
export function MediaPlayer({
  mediaId,
  playNext,
  autoPlay = false,
}: {
  mediaId: string;
  playNext?: () => void;
  autoPlay?: boolean;
}) {
  const [view, setView] = useState("reader");

  const isSmall = useIsSmall();

  const { data } = useGetMediaQuery(mediaId);

  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { theme, setTheme } = useTheme();

  const [playSwitch] = useSound(switchUrl);

  const { mode, setMode } = useMediaState();

  const containsHumanMode = useContainsHumanMode(mediaId);

  return (
    <div className="relative h-screen">
      <ListenViewType
        mediaId={mediaId}
        view={view}
        autoPlay={autoPlay}
        playNext={playNext}
      />

      <MediaLinksDialog
        isOpen={showMenu}
        closeDialog={() => {
          setShowMenu(false);
        }}
      />
      <MediaSettingsDialog
        mediaId={mediaId}
        isOpen={showSettings}
        closeDialog={() => {
          setShowSettings(false);
        }}
      />

      <div
        className={cn(
          "absolute",
          isSmall ? "bottom-8 left-16" : "right-20 top-56"
        )}
      >
        <div className="flex flex-row sm:flex-col gap-4 sm:gap-8 justify-center items-center">
          <RoundButton
            onClick={() => {
              setShowMenu((showMenu) => !showMenu);
            }}
          >
            <Icons.bars className="text-xl" />
          </RoundButton>
          <RoundButton
            onClick={() => {
              playSwitch();
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
              setShowSettings((showSettings) => !showSettings);

              // setView((prev) => (prev === "settings" ? "reader" : "settings"));
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
