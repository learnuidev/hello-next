"use client";

import Mathematics from "@tiptap-pro/extension-mathematics";
import TableOfContent from "@tiptap-pro/extension-table-of-content";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { EditorBubbleMenu } from "./bubble-menu";
import { defaultExtensions } from "./extensions";

export const Editor = ({
  content,
  // id,
  className,
  onUpdate,
  readOnly = true,
}: {
  className?: string;
  content: string;
  onUpdate?: any;
  // id: string;
  readOnly?: boolean;
}) => {
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      onUpdate?.(value);
    },
    // delay in ms
    1000
  );

  const editor = useEditor({
    autofocus: false,
    extensions: [...defaultExtensions, Mathematics, TableOfContent],

    content: content,

    onUpdate: ({ editor }) => {
      if (readOnly) {
        return null;
      } else {
        debounced(editor.getJSON());

        onUpdate && onUpdate?.(editor?.getJSON());
      }
    },
  });

  if (content) {
    return (
      <>
        {editor && <EditorBubbleMenu editor={editor} />}
        <div className={`mt-0 pt-0 ${className}`}>
          <EditorContent readOnly={readOnly} editor={editor} />
        </div>
      </>
    );
  }
};
