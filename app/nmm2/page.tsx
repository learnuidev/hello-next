'use client';

import { Editor } from "@/components/Editor";
import { useState } from "react";

export default function NomadMethodPage() {
  const [state, setCharacterState] = useState(null);
  return (
    <div>
      <Editor
        id="123"
        //  autoFocus
        onUpdate={(event: any) => {
          setCharacterState(event);
        }}
        //  placeholder={lesson?.suggestions?.join(", ")}
        className="text-center border-solid h-12 border-b-2 w-[320px] md:w-[660px] text-2xl px-2 focus:outline-none active:outline-none dark:border-gray-900"
        content={state || ""}
      />
    </div>
  );
}
