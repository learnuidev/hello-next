import { ReviewUrlButton } from "@/components/review-url-button";
import { DynaCloze } from "./dyna-cloze";
import { useState } from "react";

export const DynaSelector = ({ contentId }: { contentId: string }) => {
  const [selected, setSelected] = useState("");

  if (selected === "dynacloze") {
    return <DynaCloze contentId={contentId} />;
  }
  return (
    <div className="flex flex-col justify-center items-center lg:mt-32 mt-12">
      <h1 className="lg:text-4xl text-2xl lg:mb-12 mb-4">
        Select one of the following
      </h1>

      <div className="flex gap-8 text-2xl">
        <button onClick={() => setSelected("dynacloze")}> Dynacloze </button>
        <ReviewUrlButton contentId={contentId}>DynaclozeR</ReviewUrlButton>
      </div>
    </div>
  );
};
