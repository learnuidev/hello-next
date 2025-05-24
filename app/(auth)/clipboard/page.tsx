"use client";

import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { Clipboard } from "./clipboard";

export default function ClipboardPage() {
  const lang = useGetCurrentLang();
  return <Clipboard lang={lang} />;
}
