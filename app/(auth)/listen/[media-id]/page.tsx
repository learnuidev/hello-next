"use client";

import { Icons } from "@/components/ui/icons.v2";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Reader } from "./components/reader";
import { RoundButton } from "./components/round-button";

function ListenAnalytics() {
  return <main className="max-w-6xl m-auto p-4">todo</main>;
}
function ListenSettings() {
  return <main className="max-w-6xl m-auto p-4">todo</main>;
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

  const [showMenu, setShowMenu] = useState(false);

  const { theme, setTheme } = useTheme();

  return (
    <div className="relative">
      <ListenViewType view={view} />

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
        </div>
      </div>
    </div>
  );
}
