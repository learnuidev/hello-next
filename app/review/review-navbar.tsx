import { cn } from "@/lib/utils";

import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { useReviewModeView } from "@/app/review/use-review-mode";

import { Icons } from "@/components/ui/icons.v2";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClozeReviewTimer } from "./cloze-review-timer-store";
import { useGetCurrentReviewCharacter } from "./use-get-current-review-character";
import { NMMSettings } from "../nmm/nmm-settings";

export const ReviewNavbar = () => {
  const { setReviewMode, reviewMode: _reviewMode } = useReviewModeView();

  const { reviewMode } = useGetReviewParams();

  const {
    currentCharacter,
    lang,
    isLoading: isReviewCharactersLoading,
  } = useGetCurrentReviewCharacter();

  const { setStartTime, setEndTime } = useClozeReviewTimer(
    currentCharacter?.hanzi || currentCharacter?.input,
  );

  return (
    <div
      className={cn("transition", "flex items-center w-full justify-center")}
    >
      <div className="overflow-y-auto px-8 py-2 dark:bg-black bg-gray-50 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <div className="space-x-6 md:space-x-8 flex justify-center items-center w-full ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`transition text-xl ${
                    reviewMode === "all"
                      ? "text-gray-800 dark:text-gray-300"
                      : "text-gray-500 dark:text-gray-500"
                  } hover:text-gray-700 transition text-xl`}
                  onClick={() => {
                    if (_reviewMode === "cloze") {
                      setReviewMode("classic");
                      setEndTime();
                    } else {
                      setReviewMode("cloze");
                      setStartTime();
                    }
                  }}
                >
                  {_reviewMode === "cloze" ? (
                    <Icons.arrowUp className="hover:text-rose-400 dark:hover:text-white transition" />
                  ) : (
                    <Icons.arrowDown className="hover:text-rose-400 dark:hover:text-white transition" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{_reviewMode === "cloze" ? "Classic Mode" : "Cloze Mode"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <NMMSettings />
        </div>

        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </div>
    </div>
  );
};
