'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { defaultExtensions } from './extensions'
import { EditorBubbleMenu } from "./bubble-menu";

export const Editor = ({ content, id }: { 
  content: string
  id: string
}) => {
  const editor = useEditor({
    autofocus: true,
    extensions: [
      ...defaultExtensions
    ],
    content: JSON.parse(localStorage.getItem(id) || "") || content,
    onUpdate: ({ editor }) => {
      if (id) {
        localStorage.setItem(id, JSON.stringify(editor.getJSON()))
      }
    }
  })

  return (

    <>
       {editor && <EditorBubbleMenu editor={editor} />}
       <EditorContent editor={editor} />
    </>

  )
}

