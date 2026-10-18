"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface AuthFieldProps extends Omit<NativeInputProps, "id"> {
  id: string;
  label: string;
  /** Leading glyph rendered inside the field. */
  icon?: React.ReactNode;
  /** Validation message; also toggles the invalid styling. */
  error?: string | null;
  /** Helper copy shown under the field when there is no error. */
  hint?: React.ReactNode;
}

export function AuthField({
  id,
  label,
  icon,
  error,
  hint,
  className,
  type = "text",
  ...props
}: AuthFieldProps) {
  const [revealed, setRevealed] = React.useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && revealed ? "text" : type;

  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      <div className="relative">
        {icon ? (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center",
              "text-gray-400 transition-colors dark:text-gray-500",
              "[&>svg]:h-4 [&>svg]:w-4",
              error && "text-rose-500 dark:text-rose-400",
            )}
          >
            {icon}
          </span>
        ) : null}

        <input
          {...props}
          id={id}
          type={resolvedType}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hintId}
          className={cn(
            "h-11 w-full rounded-lg border bg-white text-sm text-gray-900 shadow-sm outline-none transition",
            "placeholder:text-gray-400 dark:bg-[#0d0f14] dark:text-gray-100 dark:placeholder:text-gray-500",
            "focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
            icon ? "pl-10" : "pl-3",
            isPassword ? "pr-11" : "pr-3",
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15 dark:border-rose-500/70"
              : "border-gray-300 focus:border-rose-400 focus:ring-rose-500/10 dark:border-gray-800 dark:focus:border-rose-500/60 dark:focus:ring-rose-500/15",
            className,
          )}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-gray-400 transition hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-500/40 dark:text-gray-500 dark:hover:text-gray-300"
          >
            {revealed ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        ) : null}
      </div>

      {error ? (
        <p
          id={errorId}
          className="mt-1.5 text-[13px] leading-snug text-rose-600 dark:text-rose-400"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={hintId}
          className="mt-1.5 text-[13px] leading-snug text-gray-500 dark:text-gray-400"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
