/* eslint-disable @next/next/no-img-element */
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import "regenerator-runtime";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useDeleteTranslationMutation } from "./hooks/use-delete-translation-mutation";
import { usePhraseParams } from "./hooks/use-phrase-params";
import { useGetTranslationHistory } from "./hooks/use-get-translation-history";
import Link from "next/link";

const PhraseActionButton = ({
  onClick,
  children,
  href,
  as,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  as?: string;
  href?: string;
}) => {
  if (as === "link") {
    return (
      <Link
        href={href || ""}
        className={`text-xs p-2  w-8 h-8 ring-1 ring-gray-700 shadow-lg rounded-full flex items-center justify-center transition`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={cn(
        "text-[14px] border-[1px] border-gray-700 dark:hover:border-gray-500 w-8 h-8 rounded-full"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

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
  const sourceLang = message?.sourceLang;
  const { contextId } = usePhraseParams();

  const { data: translationContext } = useGetTranslationHistory(contextId);

  const isSourceSameAsTarget = sourceLang === translationContext?.targetLang;

  console.log("ctx", translationContext);

  const speakLang = isSourceSameAsTarget ? sourceLang : lang;

  const { speak } = useSpeak(speakLang, {
    utterRate: 1,
  });

  const formattedOutput = message?.output
    ?.replaceAll(/&quot;/g, '"')
    ?.replaceAll(/&#39;/g, "'");

  const deleteTranslationMutation = useDeleteTranslationMutation(contextId);
  return (
    <div
      key={message.id}
      className={cn(`flex`, idx % 2 === 0 ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          `max-w-full sm:max-w-[90%] rounded-lg p-2`,
          "dark:bg-[rgb(21,22,23)] bg-white",

          "rounded-2xl p-2 sm:p-4"
        )}
      >
        <div className="flex space-x-4 flex-col">
          <div>
            {showPinyin && (
              <p className="text-gray-400 font-extralight">{message?.pinyin}</p>
            )}
            <p className="text-xl sm:text-xl font-extralight">
              {isSourceSameAsTarget ? message?.input : formattedOutput}
            </p>
            <p className="text-gray-500 mt-2">
              {isSourceSameAsTarget ? formattedOutput : message.input}
            </p>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <PhraseActionButton
              as="link"
              href={`/nmm/${isSourceSameAsTarget ? message?.input : formattedOutput}?lang=${speakLang === "zh-CN" ? "zh" : speakLang}`}
            >
              <Icons.magnifyingGlass />
            </PhraseActionButton>

            <PhraseActionButton
              onClick={() => {
                speak(isSourceSameAsTarget ? message?.input : formattedOutput);
              }}
            >
              <Icons.volume />
            </PhraseActionButton>
            <PhraseActionButton
              onClick={() => {
                deleteTranslationMutation.mutateAsync({ id: message?.id });
              }}
            >
              {deleteTranslationMutation.isLoading ? (
                <Icons.loadingSpinner spinPulse />
              ) : (
                <Icons.trash />
              )}
            </PhraseActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
