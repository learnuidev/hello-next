"use client";

import { CloseIcon } from "@/components/ui/icons";
import { useViewModeStore } from "./use-viewmode-store";

import { StepTitleContainer, useNewConvoStore } from "@/components/step";

export function NewContentHeader() {
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const step = useNewConvoStore((state) => state.step);
  const setStep = useNewConvoStore((state) => state.setStep);

  return (
    <div className="my-8 px-28 grid grid-cols-3">
      <div className="space-x-4">
        <button
          className="text-xl md:text-4xl dark:hover:text-white md:px-4 py-1 dark:text-slate-600 shadow-md rounded-full"
          onClick={() => {
            setViewMode("");
          }}
        >
          <CloseIcon />
        </button>
      </div>

      <StepTitleContainer>
        {[
          {
            stepId: "content",
          },
          {
            stepId: "details",
          },
          {
            stepId: "preview",
          },
        ].map((item: any, idx: any) => {
          return (
            <button
              key={`${item?.stepId}-${idx}`}
              onClick={() => {
                setStep(item?.stepId);
              }}
              className={`mx-4 my-2 text-xl ${
                item?.stepId === step
                  ? "dark:text-slate-200"
                  : "dark:text-slate-500"
              } dark:hover:text-white font-extralight`}
            >
              <div
                className={` ${
                  item?.stepId === step
                    ? "dark:bg-slate-200"
                    : "dark:bg-slate-600"
                } h-2 w-2 rounded-full text`}
              ></div>
              {/* {idx + 1} */}
            </button>
          );
        })}
      </StepTitleContainer>

      <div></div>
    </div>
  );
}
