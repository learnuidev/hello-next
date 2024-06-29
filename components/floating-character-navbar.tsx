import { useListComponents } from "@/domain/lesson/component.queries";
import { SelectedCharacterProps } from "./_select-character/select-character.types";

import { Icons } from "./ui/icons.v2";
import { cn } from "@/lib/utils";

import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
export const FloatingCharacterNavbar = (props: SelectedCharacterProps) => {
  const {
    selectedComp,
    setReadMode,
    readMode,
    isAlreadyLearned,
    addCharacterMutation,
    selectedComp2,
    setView,
    view,
    lang,
    characterId,
    selectedChar,
    firstLesson,
    discoverMutation,
    deleteComponentMutation,
  } = props;

  const { data: components, isLoading } = useListComponents();
  const { data: chars } = useListCharactersQuery();
  const hasAlreadyLearned = components?.find(
    (item: any) => (item?.hanzi || item?.input) === characterId
  );

  const hasAlreadyReviewed = chars?.find(
    (item: any) => (item?.hanzi || item?.input) === characterId
  );

  console.log("CHARACTER ID", characterId);

  const pinyinOrRoman =
    (hasAlreadyLearned && hasAlreadyLearned?.pinyin) ||
    hasAlreadyLearned?.roman;

  const multiSentence =
    pinyinOrRoman?.split(".")?.length > 1 ||
    pinyinOrRoman?.split("?")?.length > 1;

  const routeName = usePathname();

  const currentCharacter = selectedComp;

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  return (
    <div className="flex w-full fixed z-50 bottom-4">
      <div className="flex items-center w-full justify-center">
        <div className="px-8  py-2 bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <div className="space-x-8 flex justify-center items-center w-full">
            <Link
              href={`/review?input=${characterId}&lang=${lang}`}
              className={cn(
                "text-gray-800 dark:text-gray-300",
                "transition text-xl "
              )}
            >
              <Icons.playCircle className="hover:text-white transition" />
            </Link>

            <button
              className={cn("text-xl")}
              onClick={() => {
                setReadMode(!readMode);
              }}
            >
              <Icons.glassesRound />
            </button>

            <button
              className="text-xl"
              onClick={() => {
                setView("play");
              }}
            >
              <Icons.play className="text-2xl" />
            </button>
            {multiSentence && (
              <button
                className="text-xl"
                onClick={() => {
                  // setView("unzoom");
                  if (view === "zoom") {
                    setView("unzoom");
                  } else {
                    setView("zoom");
                  }
                }}
              >
                {view === "zoom" ? (
                  <Icons.zoomOut className="text-2xl" />
                ) : (
                  <Icons.zoomIn className="text-2xl" />
                )}
              </button>
            )}
            {isLoading || isAlreadyLearned ? null : (
              <button
                className="text-xl"
                onClick={() => {
                  addCharacterMutation?.mutateAsync({
                    lang: lang,
                    status: "DISCOVERED",
                    story: "todo",
                    hanzi: firstLesson?.hanzi || selectedChar,
                    journeyId: firstLesson?.id || "default",
                  });
                }}
              >
                {addCharacterMutation.isLoading ? (
                  <Icons.spinner spinPulse />
                ) : (
                  <Icons.lightBulb className="text-2xl" />
                )}
              </button>
            )}
            {!isAlreadyLearned ||
            currentCharacter?.status === "forgotten" ? null : (
              <button
                disabled={updateCharacterStatusMutation?.isLoading}
                onClick={() => {
                  //  const { timeTaken } = getEndTimeAndDiff(startTime, endTime);
                  updateCharacterStatusMutation
                    .mutateAsync({
                      characterId: currentCharacter?.id,
                      status: "forgotten",
                      forgottenAt: Date.now(),
                      rightAt: Date.now(),
                      rightCount: (currentCharacter?.rightCount || 0) + 1,
                    } as any)
                    .then((res) => {
                      const startTime = Date.now();
                      // setReveal(false);
                      // setStartTime(startTime);
                      // setEndTime(startTime);
                      // setReviewCount(reviewCount + 1);
                    });
                }}
              >
                {updateCharacterStatusMutation.isLoading ? (
                  <Icons.spinner className="text-2xl" spinPulse />
                ) : updateCharacterStatusMutation.isSuccess ? (
                  <Icons.checkCircle className="transition text-2xl" />
                ) : (
                  <Icons.fire className="text-2xl" />
                )}
              </button>

              // <button
              //   className="text-xl"
              //   onClick={() => {
              //     addCharacterMutation?.mutateAsync({
              //       lang: lang,
              //       status: "DISCOVERED",
              //       story: "todo",
              //       hanzi: firstLesson?.hanzi || selectedChar,
              //       journeyId: firstLesson?.id || "default",
              //     });
              //   }}
              // >
              //   {addCharacterMutation.isLoading ? (
              //     <Icons.spinner spinPulse />
              //   ) : addCharacterMutation.isSuccess ? (
              //     <Icons.checkCircle className="transition" />
              //   ) : (
              //     <Icons.lightBulb className="text-2xl" />
              //   )}
              // </button>
            )}
            {isLoading ||
            selectedComp2?.updated_at ? null : !selectedComp2?.updated_at ||
              !selectedComp2?.discoveredAt ? (
              // (selectedComp?.hanzi || characterId)?.length > 1 ? null : (
              false ? null : hasAlreadyLearned?.discoveredAt ? null : (
                <button
                  className="text-xl"
                  disabled={
                    discoverMutation.isLoading || discoverMutation.isSuccess
                  }
                  onClick={() => {
                    discoverMutation
                      .mutateAsync({
                        hanzi: selectedComp?.hanzi || characterId,
                        // story: "todo",
                      })
                      .then((resp: any) => {
                        toast(
                          `Component Successfully discovered ${JSON.stringify(resp)}`
                        );
                      });
                  }}
                >
                  {discoverMutation.isLoading ? (
                    <Icons.spinner spinPulse />
                  ) : discoverMutation.isSuccess ? (
                    <Icons.checkCircle className="transition" />
                  ) : (
                    <Icons.language />
                  )}

                  {/* <span>{(selectedComp?.hanzi || characterId)?.length}</span> */}
                </button>
              )
            ) : null}
            {!hasAlreadyReviewed?.id ? null : (
              <button
                className="text-xl"
                disabled={deleteComponentMutation.isLoading}
                onClick={() => {
                  deleteComponentMutation
                    .mutateAsync({
                      hanzi: hasAlreadyReviewed?.hanzi,
                      id: hasAlreadyReviewed?.id,
                    } as any)
                    .then((resp: any) => {
                      toast(`Component: ${selectedComp?.hanzi || characterId} Successfully deleted  
                      \n 
                      ${JSON.stringify(resp)}`);
                    });
                }}
              >
                {deleteComponentMutation.isLoading ? (
                  <Icons.spinner spinPulse />
                ) : discoverMutation.isSuccess ? (
                  <Icons.checkCircle className="transition" />
                ) : (
                  <Icons.powerOff />
                )}
              </button>
            )}
          </div>

          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
      </div>
    </div>
  );
};
