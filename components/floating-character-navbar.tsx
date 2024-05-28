import { useListComponents } from "@/domain/lesson/component.queries";
import { SelectedCharacterProps } from "./_select-character/select-character.types";

import { Icons } from "./ui/icons.v2";
import { cn } from "@/lib/utils";
// import { useToast } from "./ui/use-toast";

import { toast } from "sonner";
export const FloatingCharacterNavbar = (props: SelectedCharacterProps) => {
  const {
    selectedComp,
    setReadMode,
    readMode,
    isAlreadyLearned,
    addCharacterMutation,
    selectedComp2,
    setView,
    lang,
    characterId,
    selectedChar,
    firstLesson,
    discoverMutation,
    deleteComponentMutation,
  } = props;

  const { data: components } = useListComponents();
  const hasAlreadyLearned = components?.find(
    (item: any) => (item?.hanzi || item?.input) === characterId
  );

  return (
    <div className="flex w-full fixed z-50 bottom-4">
      <div className="flex items-center w-full justify-center">
        <div className="px-8  py-2 bg-slate-900 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <div className="space-x-8 flex justify-center items-center w-full">
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
            {isAlreadyLearned ? null : (
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
                ) : addCharacterMutation.isSuccess ? (
                  <Icons.checkCircle className="transition" />
                ) : (
                  <Icons.lightBulb className="text-2xl" />
                )}
              </button>
            )}
            {selectedComp2?.updated_at ? null : !selectedComp2?.updated_at ||
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
            {true ? null : (
              <button
                className="text-xl"
                disabled={
                  deleteComponentMutation.isLoading ||
                  deleteComponentMutation.isSuccess
                }
                onClick={() => {
                  deleteComponentMutation
                    .mutateAsync({
                      hanzi: selectedComp?.hanzi || characterId,
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
