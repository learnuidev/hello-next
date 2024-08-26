"use client";

import {
  StepContainerVariant1,
  StepInput,
  StepTitle,
  useNewConvoStore,
  StepDebugger,
  StepTitleContainer,
} from "@/components/step";
import { Icons } from "@/components/ui/icons.v2";
import { usePathname } from "next/navigation";

export default function Onboarding() {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;
  const setStep = useNewConvoStore((state) => state.setStep);
  const step = useNewConvoStore((state) => state.step);
  const routeName = usePathname();

  // const resolvedStep = routeName === "/onboarding" &&  "currentLang" : step;

  return (
    <div className="w-full">
      <p>{JSON.stringify(step)}</p>
      {/* {step === "currentLang" && ( */}
      <div className="flex my-8 px-28">
        <div className="space-x-4">
          <button
            className="text-xl md:text-4xl dark:hover:text-white shadow-md md:px-4 py-1 rounded-full dark:text-slate-600 shadow-md rounded-full"
            onClick={() => {
              // setViewMode("");
            }}
          >
            <Icons.xMark />
          </button>
        </div>

        <StepTitleContainer>
          {[
            {
              stepId: "currentLang",
            },
            {
              stepId: "targetLang",
            },

            {
              stepId: "interests",
            },
            {
              stepId: "confirm",
            },
          ].map((item: any, idx: any) => {
            // const [time, ...rest] = item
            // const earliestTime = time[1][0]
            // const latestTime = time[1][time[1].length - 1]

            const currentTime = 1;
            const earliestTime = 2;
            const latestTime = 2;

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
      {/* )} */}

      <div>
        {step === "currentLang" && (
          <StepContainerVariant1>
            <StepTitle>Current Language</StepTitle>

            <StepInput
              onChange={(event: any) => {
                setConvo("currentLang", event?.target?.value);
              }}
              value={newConvo?.currentLang}
              placeholder="your current language"
              onKeyDown={(event: any) => {
                if (event?.keyCode === 13) {
                  if (newConvo.currentLang) {
                    setStep("targetLang");
                  }
                }
              }}
            />
          </StepContainerVariant1>
        )}
        {step === "targetLang" && (
          <StepContainerVariant1>
            <StepTitle>Target Language</StepTitle>

            <StepInput
              onChange={(event: any) => {
                setConvo("targetLang", event?.target?.value);
              }}
              value={newConvo?.targetlang}
              placeholder="your target language"
              onKeyDown={(event: any) => {
                if (event?.keyCode === 13) {
                  if (newConvo.targetLang) {
                    // todo: validation
                    setStep("interests");
                    // setStep("futureLangauge");
                  }
                }
              }}
            />
          </StepContainerVariant1>
        )}
        {step === "interests" && (
          <StepContainerVariant1>
            <StepTitle>Current Interests</StepTitle>

            <StepInput
              onChange={(event: any) => {
                setConvo("currentInterests", event?.target?.value);
              }}
              value={newConvo?.currentInterests}
              placeholder="your interests"
              onKeyDown={(event: any) => {
                if (event?.keyCode === 13) {
                  if (newConvo.futureLang) {
                    setStep("confirm");
                    // setStep("futureLangauge");
                  }
                }
              }}
            />
          </StepContainerVariant1>
        )}
        {step === "confirm" && (
          <StepContainerVariant1>
            <StepTitle>Current Interests</StepTitle>

            <button> Confirm </button>
          </StepContainerVariant1>
        )}
        <StepDebugger />
      </div>
    </div>
  );

  return (
    <div>
      <StepTitleContainer>
        {[
          {
            stepId: "current-lang",
          },
          {
            stepId: "target-lang",
          },
          {
            stepId: "interests",
          },
        ].map((item: any, idx: any) => {
          // const [time, ...rest] = item
          // const earliestTime = time[1][0]
          // const latestTime = time[1][time[1].length - 1]

          const currentTime = 1;
          const earliestTime = 2;
          const latestTime = 2;

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
    </div>
  );
}
