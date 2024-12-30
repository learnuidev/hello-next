/* eslint-disable @next/next/no-img-element */
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import "regenerator-runtime";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useDeleteTranslationMutation } from "./hooks/use-delete-translation-mutation";
import { usePhraseParams } from "./hooks/use-phrase-params";

const PhraseActionButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
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

  const { speak } = useSpeak(lang, {
    utterRate: 1,
  });

  const formattedOutput = message?.output
    ?.replaceAll(/&quot;/g, '"')
    ?.replaceAll(/&#39;/g, "'");

  const { contextId } = usePhraseParams();

  const deleteTranslationMutation = useDeleteTranslationMutation(contextId);
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
        <div className="flex space-x-4 flex-col">
          <div>
            {showPinyin && (
              <p className="text-gray-400 font-extralight">{message?.pinyin}</p>
            )}
            <p className="text-xl sm:text-xl font-extralight">
              {formattedOutput}
            </p>
            <p className="text-gray-500 text-sm sm:text-md mt-2">
              {message.input}
            </p>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <PhraseActionButton
              onClick={() => {
                speak(formattedOutput);
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
