"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

/**
 * Naming a loop, the way a DAW does it.
 *
 * Click save and the name appears where the button was, already written and
 * already selected — so typing replaces it and Enter keeps it. Escape, or
 * emptying it, throws it away. It commits on blur too, because the thing you
 * clicked next is usually the thing you wanted, not a way to cancel.
 */
export const LoopNameField = ({
  initial,
  placeholder = "Name this loop",
  onCommit,
  onCancel,
  className,
}: {
  initial: string;
  placeholder?: string;
  onCommit: (name: string) => void;
  onCancel: () => void;
  className?: string;
}) => {
  const [value, setValue] = useState(initial);
  const inputRef = useRef<HTMLInputElement>(null);
  /** Guards against commit-then-blur firing the handler twice. */
  const settledRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const commit = () => {
    if (settledRef.current) {
      return;
    }

    settledRef.current = true;

    const name = value.trim();

    if (!name) {
      onCancel();
      return;
    }

    onCommit(name);
  };

  const cancel = () => {
    if (settledRef.current) {
      return;
    }

    settledRef.current = true;
    onCancel();
  };

  return (
    <input
      ref={inputRef}
      value={value}
      placeholder={placeholder}
      aria-label="Loop name"
      spellCheck={false}
      autoComplete="off"
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={(event) => {
        // Typing in here is naming, not playing: the player's shortcuts must
        // not hear it.
        event.stopPropagation();

        if (event.key === "Enter") {
          event.preventDefault();
          commit();
        } else if (event.key === "Escape") {
          event.preventDefault();
          cancel();
        }
      }}
      onPointerDown={(event) => event.stopPropagation()}
      onBlur={commit}
      className={cn(
        "rounded-full border border-indigo-500/40 bg-white px-2.5 py-1 text-[11px] font-semibold text-black outline-none",
        "ring-2 ring-indigo-500/25 transition-shadow duration-150 focus:ring-indigo-500/45",
        "dark:bg-[rgb(28,29,31)] dark:text-white",
        className,
      )}
      style={{ width: `${Math.min(Math.max(value.length + 2, 10), 26)}ch` }}
    />
  );
};
