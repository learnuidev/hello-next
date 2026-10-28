"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useHasMounted } from "../hooks/use-has-mounted";

/**
 * The light/dark switch of the reader.
 *
 * Reading is the one thing in the app that is done for long stretches, and the
 * room it is done in is worth being able to change without leaving the text —
 * so the switch sits with the other switches of the reading view: under the
 * preview button in the side dock, and under it in the phone's display menu.
 *
 * Which way it points is only known in the browser (the theme is picked on the
 * client), so the icon waits for the first render rather than guessing and
 * flipping once the page hydrates.
 */
export const ReaderThemeToggle = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  const isDark = resolvedTheme !== "light";
  const title = isDark ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
      className={cn(
        "flex items-center justify-center text-xl text-gray-500 outline-none transition",
        "hover:text-rose-400 focus-visible:ring-1 focus-visible:ring-rose-400/70 dark:hover:text-white",
        className,
      )}
    >
      {hasMounted ? (
        isDark ? (
          <Sun className="h-[1em] w-[1em]" />
        ) : (
          <Moon className="h-[1em] w-[1em]" />
        )
      ) : (
        // The same square the icon takes, so nothing shifts when it arrives.
        <span className="inline-block h-[1em] w-[1em]" />
      )}
    </button>
  );
};
