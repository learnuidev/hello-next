/* eslint-disable @next/next/no-img-element */
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import "regenerator-runtime";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

export function PhraseItem({
  message,
  idx,
  showPinyin,
}: {
  message: any;
  idx: any;
  showPinyin: boolean;
}) {
  const lang = message?.targetLang;

  const { speak } = useSpeak(lang, {
    utterRate: 1,
  });

  const formattedOutput = message?.output
    ?.replaceAll(/&quot;/g, '"')
    ?.replaceAll(/&#39;/g, "'");
  return (
    <div
      key={message.id}
      className={cn(`flex`, idx % 2 === 0 ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          `max-w-full sm:max-w-[70%] rounded-lg p-2`,
          "dark:bg-[rgb(21,22,23)] bg-white",

          "rounded-2xl px-2 py-2"
        )}
      >
        <div className="flex space-x-4 items-center">
          <div>
            {showPinyin && (
              <p className="text-gray-400 font-extralight">{message?.pinyin}</p>
            )}
            <p className="text-xl sm:text-2xl">{formattedOutput}</p>
            <p className="text-gray-500 text-sm sm:text-md">{message.input}</p>
          </div>

          <div className="flex justify-end">
            <button
              className={cn(
                "sm:text-xl text-[16px] border-[1px] border-gray-700 dark:hover:border-gray-500 w-6 h-6 sm:w-10 sm:h-10 rounded-full"
              )}
              onClick={() => {
                speak(formattedOutput);
              }}
            >
              <Icons.volume />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
