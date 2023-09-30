"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { defaultExtensions } from "./extensions";
import { EditorBubbleMenu } from "./bubble-menu";
import Mathematics from "@tiptap-pro/extension-mathematics";
import UniqueID from "@tiptap-pro/extension-unique-id";
import TableOfContent from "@tiptap-pro/extension-table-of-content";
import { ToC } from "./ToC";
import React from "react";

import "katex/dist/katex.min.css";

const MemorizedToC = React.memo(ToC);
// const MemorizedToC = ToC

export const Editor = ({
  content,
  id,
  className,
  isTocHidden,
}: {
  className?: string;
  content: string;
  id: string;
  isTocHidden: boolean;
  setIsTocHidden: (ishidden: boolean) => void;
}) => {
  const editor = useEditor({
    autofocus: true,
    extensions: [
      ...defaultExtensions,
      // Mathematics.configure({
      //   katexOptions: {
      //     maxSize: 300
      //   }
      // }),
      Mathematics,
      UniqueID.configure({
        attributeName: "uid",
        types: ["heading", "paragraph"],
      }),
      TableOfContent,
    ],
    // content: content,
    content:
      typeof window !== "undefined" && localStorage?.getItem(id)
        ? JSON.parse(localStorage?.getItem(id) || "")
        : content,
    onUpdate: ({ editor }) => {
      if (id) {
        localStorage &&
          localStorage.setItem(id, JSON.stringify(editor.getJSON()));
      }
    },
  });

  return (
    <>
      {/* <div className="hidden sm:block table-of-content">
        <MemorizedToC
          editor={editor}
          items={editor?.storage?.tableOfContent?.content}
        />
      </div> */}
      {editor && <EditorBubbleMenu editor={editor} />}
      <div>
        <EditorContent className={className} editor={editor} />
      </div>
    </>
  );
};
