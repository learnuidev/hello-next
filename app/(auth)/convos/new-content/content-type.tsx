import { StepContainerVariant1, StepTitle } from "@/components/step";
import { useState } from "react";

import { Dropzone } from "./dropzone";
import { Icons } from "@/components/ui/icons.v2";

export const ContentType = () => {
  return (
    <StepContainerVariant1>
      <StepTitle>Add Content</StepTitle>

      <section className="m-auto">
        <Dropzone />
      </section>
    </StepContainerVariant1>
  );
};
