"use client";

import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";

import { usePreviousPathnameStore } from "@/components/language-selector/use-previous-path-name-store";

export function BackButton({ href }: { href: string }) {
  const { setPreviousPath, previousPath } = usePreviousPathnameStore();

  return (
    <Link href={previousPath ? previousPath : href}>
      <Icons.xMark className="text-2xl" />
    </Link>
  );
}
