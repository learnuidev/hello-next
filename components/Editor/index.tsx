'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { defaultExtensions } from './extensions'
import { EditorBubbleMenu } from "./bubble-menu";
import Mathematics from '@tiptap-pro/extension-mathematics'
import UniqueID from '@tiptap-pro/extension-unique-id'
import TableOfContent from '@tiptap-pro/extension-table-of-content';
import { ToC } from './TOC'
import React from 'react';

import 'katex/dist/katex.min.css'



const MemorizedToC = React.memo(ToC)
// const MemorizedToC = ToC

export const Editor = ({ content, id }: { 
  content: string
  id: string
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
        attributeName: 'uid',
        types: ['heading', 'paragraph'],
      }),
      TableOfContent
    ],
    // content: content,
    content: JSON.parse(localStorage.getItem(id) || "") || content,
    onUpdate: ({ editor }) => {
      if (id) {
        localStorage.setItem(id, JSON.stringify(editor.getJSON()))
      }
    }
  })

  console.log("LOGGED", editor?.storage?.tableOfContent?.content)

  return (

    <>
      <div className="table-of-content">
        <MemorizedToC editor={editor} items={editor?.storage?.tableOfContent?.content} />
      </div>
       {editor && <EditorBubbleMenu editor={editor} />}
       <EditorContent editor={editor} />
    </>

  )
}

