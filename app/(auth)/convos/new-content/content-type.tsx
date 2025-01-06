import { StepContainerVariant1, StepTitle } from "@/components/step";
import { useState } from "react";

import { Dropzone } from "./dropzone";

export const ContentType = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };

  return (
    <StepContainerVariant1>
      <StepTitle>Add Content</StepTitle>

      <section className="flex justify-center items-center m-auto">
        <Dropzone />
      </section>
    </StepContainerVariant1>
  );
};
