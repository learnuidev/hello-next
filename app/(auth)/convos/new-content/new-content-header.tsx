"use client";

import { CloseIcon } from "@/components/ui/icons";

import { StepTitleContainer, useNewConvoStore } from "@/components/step";
import { useViewModeStore } from "@/components/convos/useViewModeStore";

export function NewContentHeader() {
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const step = useNewConvoStore((state) => state.step);
  const setStep = useNewConvoStore((state) => state.setStep);

  return (
    <div className="my-8 px-4 sm:px-28 grid grid-cols-3">
      <div className="space-x-4">
        <button
          className="text-xl md:text-4xl dark:hover:text-white px-4 py-[8px] dark:text-slate-600 shadow-md rounded-full"
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
                  ? "dark:text-slate-200 text-slate-800"
                  : "dark:text-slate-500 text-slate-700"
              } dark:hover:text-white font-extralight`}
            >
              <div
                className={` ${
                  item?.stepId === step
                    ? "dark:bg-slate-200 bg-slate-800"
                    : "dark:bg-slate-600 bg-slate-300"
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
