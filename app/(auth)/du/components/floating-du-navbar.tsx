import { cn } from "@/lib/utils";

import { useReverifyUserHandler } from "@/app/(auth)/du/hooks/auth/use-verify-user";
import { useDuStore } from "@/app/(auth)/du/hooks/use-du-store";
import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { Icons } from "@/components/ui/icons.v2";

export const FloatingDuNavbar = () => {
  const { reviewMode } = useGetReviewParams();

  const setCookie = useDuStore((state) => state.setCookie);

  const reverifyUserHandler = useReverifyUserHandler();

  return (
    <div
      className={cn("transition", "flex items-center w-full justify-center")}
    >
      <div className="overflow-y-auto px-8 py-2 bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <div className="space-x-6 md:space-x-8 flex justify-center items-center w-full ">
          <button
            onClick={() => {
              setCookie("");
              reverifyUserHandler();
            }}
            className={`transition ${
              !reviewMode
                ? "text-gray-800 dark:text-gray-300"
                : "text-gray-200 dark:text-gray-500"
            } hover:text-gray-700 transition text-xl`}
          >
            <Icons.powerOff className="hover:text-white transition" />
          </button>
        </div>

        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </div>
    </div>
  );
};
