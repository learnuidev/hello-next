"use client";

import { Icons } from "@/components/ui/icons.v2";
import { defaultState } from "../constants/default-state";
import { useClipboardState } from "../hooks/use-clipboard-state";

export function ClipboardFooter({
  mode,
  setMode,
}: {
  mode: string;
  setMode: (mode: string) => void;
}) {
  const { setState } = useClipboardState();
  return (
    <footer className="w-full max-w-4xl sm:pr-0 pr-12 fixed bottom-0 py-8 z-30 dark:bg-[rgb(9,10,11)]/75 bg-white/75 dark:bg-react/75 backdrop-blur-sm">
      <div className="grid grid-cols-3 justify-between w-full">
        <button
          className="w-12 justify-self-start"
          onClick={() => {
            setState("");
          }}
        >
          <Icons.trash className="text-2xl" />
        </button>
        {mode === "read" ? (
          <button
            className="dark:bg-[rgb(31,32,33)]  bg-gray-100 px-4 sm:px-8 py-2 rounded-full justify-self-center"
            onClick={() => {
              setMode("edit");
            }}
          >
            <Icons.bookOpen />
            <span className="pl-2"> Edit</span>
          </button>
        ) : (
          <button
            className="bg-rose-500 text-white  px-4 sm:px-8 py-2 rounded-full justify-self-center"
            onClick={() => {
              setMode("read");
            }}
          >
            <Icons.bookOpen />
            <span className="pl-2"> Read</span>
          </button>
        )}
        <button
          className="w-12  justify-self-end"
          onClick={() => {
            setState(defaultState);
          }}
        >
          <Icons.clipboard className="text-2xl" />
        </button>
      </div>
    </footer>
  );
}
