"use client";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { defaultExtensions } from "@/components/Editor/extensions";
import { useMutation } from "@tanstack/react-query";
import { EditorContent, useEditor } from "@tiptap/react";

interface ListCorrectionsRequest {
  content: string;
  sourceLang: string;
  targetLang: string;
}

type CorrectionDetail = {
  original: string;
  correction: string;
};

type ListCorrectionsResponse = {
  correction: string;
  details: CorrectionDetail[];
};

const sampleData: ListCorrectionsResponse = {
  correction:
    "Hoy fue un gran día Voy al cine con mi esposa y mi niña Victoria.",
  details: [
    {
      original: "So today was a great day",
      correction: "Hoy fue un gran día.",
    },
    {
      original: "So today was a great day",
      correction: "Hoy fue un gran día.",
    },
    {
      original: "voy",
      correction: "Voy",
    },
    {
      original: "nina victoria",
      correction: "niña Victoria",
    },
  ],
};

const useListCorrectionsMutation = () => {
  const jwt = useJwtToken();

  return useMutation({
    mutationFn: async ({ content }: ListCorrectionsRequest) => {
      const response = await fetch("/api/list-corrections", {
        method: "POST",
        headers: {
          Authorization: `${jwt}`,
        },
        body: JSON.stringify({ content, sourceLang: "en", targetLang: "zh" }),
      });

      return (await response.json()) as ListCorrectionsResponse;
    },
  });
};

export default function Diary() {
  const editor = useEditor({
    autofocus: false,
    // extensions: [],
    extensions: [...defaultExtensions],

    content: "",

    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });

  return (
    <div className="max-w-3xl m-auto mt-12 px-4">
      <h1 className="font-bold mb-12">the diary</h1>
      <EditorContent editor={editor} />
    </div>
  );
}
