import { useClipboardFocus } from "../../../hooks/use-clipboard-focus";
import { useClipboardTranslations } from "../../../hooks/use-clipboard-translations";
import { useClipboardFocused } from "../hooks/use-clipboard-focused";

export function ReadModeHeader() {
  const { focusedWord: selected } = useClipboardFocused();

  const { translations } = useClipboardTranslations();

  const { focused } = useClipboardFocus();

  const currentTranslation = translations?.[focused];

  return (
    <div className="fixed top-[75px] max-w-4xl w-full z-30 dark:bg-black bg-white p-2">
      <div className="flex gap-2 flex-col">
        <div className="sticky top-0 pt-4 px-2 pb-[4px] bg-gray-50 dark:bg-[rgb(9,10,11)]">
          <div className="pb-4">
            <h4 className="text-xs text-gray-500">Sentence</h4>
            <div className={`flex justify-between items-center mt-2 w-full`}>
              <p className="space-x-2 text-[16px] font-extralight pb-[4px]">
                {currentTranslation?.output}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 px-2 pb-[4px] dark:bg-[rgb(9,10,11)] bg-gray-50">
          <h4 className="text-xs text-gray-500">Word</h4>

          {selected ? (
            <div className="mt-2 w-full">
              <div className="flex justify-between items-center">
                <p className="space-x-2 text-[16px] font-extralight">
                  <span>{selected?.hanzi}</span>

                  <span className="text-red-400">{selected?.pinyin}</span>
                </p>

                {selected?.level && <p>HSK {selected?.level}</p>}
              </div>

              <p className="font-extralight">
                <span className="wrap">{selected?.en}</span>
              </p>
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
    </div>
  );
}
