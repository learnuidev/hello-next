import { StepTitle } from "@/components/step";
import { Dropzone } from "./dropzone";

export const ContentType = () => {
  return (
    <div className="mx-4 md:mx-32">
      <StepTitle>Add Content</StepTitle>

      <section className="max-w-4xl m-auto">
        <Dropzone />
      </section>
    </div>
  );
};
