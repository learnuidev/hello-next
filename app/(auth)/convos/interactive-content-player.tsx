"use client";

import { IContent } from "@/domain/content/content.api";

export function InteractiveContentPlayer({ content }: { content: IContent }) {
  console.log("content", content);
  return (
    <main className="w-full px-4 lg:px-12">
      <div className="space-y-4 flex flex-col md:space-y-4">Interacto</div>
    </main>
  );
}
