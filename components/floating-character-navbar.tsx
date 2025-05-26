import { useListComponentsQuery } from "@/domain/lesson/component.queries";

import { Icons } from "./ui/icons.v2";

import { useCharacterContextStore } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";
import { useShowAutomaticallyTheDock } from "@/hooks/use-show-automatically-the-dock";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { SelectedCharacterContentsButton } from "./_select-character/selected-character-contents-button";
import { SelectedCharacterStoryButton } from "./_select-character/selected-character-story-button";
import { BrightModeButton } from "./bright-mode-button";
import { PinyinButton } from "./pinyin-button";
import { TheDock } from "./the-dock";
import { useSelectedCharacterData } from "./use-selected-character";
import { CommonCharacterButton } from "./common-character-button";

const DiscoverButton = ({ characterId }: { characterId: string }) => {
  const discoverMutation = useDiscoverMutation();
  const { data: components, isLoading } = useListComponentsQuery();

  const hasAlreadyDiscovered = components?.find(
    (item: any) => (item?.hanzi || item?.input) === characterId
  );

  if (characterId?.length > 3 || isLoading) {
    return null;
  }

  if (characterId?.length === 3 && hasAlreadyDiscovered?.group) {
    return null;
  }

  if (hasAlreadyDiscovered) {
    return null;
  }

  return (
    <button
      className="text-xl text-gray-400 hover:text-black"
      disabled={discoverMutation.isLoading || discoverMutation.isSuccess}
      onClick={() => {
        discoverMutation
          .mutateAsync({
            hanzi: characterId,
            // story: "todo",
          })
          .then((resp: any) => {
            toast(`Component Successfully discovered ${JSON.stringify(resp)}`);
          });
      }}
    >
      {discoverMutation.isLoading ? (
        <Icons.spinner spinPulse />
      ) : (
        <Icons.language />
      )}

      {/* <span>{(selectedComp?.hanzi || characterId)?.length}</span> */}
    </button>
  );
};

const isMultiSentence = (str: string) => {
  const isHanziMultiSentence = str.split("。")?.length > 1;

  if (!isHanziMultiSentence) {
    return str.split(".")?.length > 1;
  }

  return isHanziMultiSentence;
};
export const FloatingCharacterNavbar = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { data: characterData } = useSelectedCharacterData({ characterId });

  const {
    selectedComp,
    setReadMode,
    readMode,
    isAlreadyLearned,
    addCharacterMutation,
    setView,
    view,
    selectedComp2,
    lang,
    selectedChar,
    firstLesson,
    deleteComponentMutation,
  } = characterData;

  const searchParams = useSearchParams();

  const context = searchParams?.get("context");

  const { data: components, isLoading } = useListComponentsQuery();
  const { data: chars } = useListCharactersQuery();

  const hasAlreadyDiscovered = components?.find(
    (item: any) => (item?.hanzi || item?.input) === characterId
  );

  const currentCharacter = selectedComp;

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  const { data } = useListCharactersQuery();

  const learnedChar = data?.filter(
    (item: any) => (item?.input || item?.hanzi) === characterId
  )?.[0];

  const isAutomatic = useShowAutomaticallyTheDock();

  const characterContext = useCharacterContextStore((state) => state.context);
  const contentContext = characterContext?.filter((item) =>
    JSON.stringify(item)?.includes(firstLesson?.hanzi || selectedChar)
  );

  return (
    <TheDock isAutomatic={isAutomatic} className="bottom-4">
      <div className="flex items-center w-full justify-center">
        <div className="px-8  py-2 bg-gray-100 dark:bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <div className="space-x-8 flex justify-center items-center w-full">
            <CommonCharacterButton />
            <BrightModeButton />

            <PinyinButton />

            <button
              className="text-xl text-black dark:text-white"
              onClick={() => {
                setView("review");
              }}
            >
              <Icons.play className="text-2xl" />
            </button>

            {isAlreadyLearned ? null : (
              <button
                className="text-xl text-black dark:text-white"
                onClick={() => {
                  addCharacterMutation?.mutateAsync({
                    lang: lang,
                    status: "DISCOVERED",
                    context,
                    contentContext:
                      contentContext?.length > 0 ? contentContext : null,
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
                className="text-xl text-black dark:text-white"
                onClick={() => {
                  updateCharacterStatusMutation.mutateAsync({
                    characterId: currentCharacter?.id,
                    status: "forgotten",
                    statusHistory: (
                      currentCharacter?.statusHistory || []
                    ).concat({
                      type: "status-change",
                      createdAt: Date.now(),
                      newStatus: "forgotten",
                      oldStatus: currentCharacter?.status,
                    }),
                    forgottenAt: Date.now(),
                    rightAt: Date.now(),
                    rightCount: (currentCharacter?.rightCount || 0) + 1,
                  } as any);
                }}
              >
                {updateCharacterStatusMutation.isLoading ? (
                  <Icons.spinner className="text-2xl" spinPulse />
                ) : (
                  <Icons.fire className="text-2xl" />
                )}
              </button>
            )}

            <DiscoverButton characterId={characterId} />

            {isAlreadyLearned && (
              <button
                className="text-xl text-black dark:text-white"
                disabled={deleteComponentMutation.isLoading}
                onDoubleClick={() => {
                  deleteComponentMutation
                    .mutateAsync({
                      hanzi: currentCharacter?.hanzi,
                      id: currentCharacter?.id,
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
                ) : (
                  <Icons.trash />
                )}
              </button>
            )}
            {isAlreadyLearned && currentCharacter?.status === "forgotten" && (
              <button
                className="text-xl text-black dark:text-white"
                disabled={updateCharacterStatusMutation.isLoading}
                onDoubleClick={() => {
                  updateCharacterStatusMutation.mutateAsync({
                    characterId: currentCharacter?.id,
                    status: "DISCOVERED",
                    forgottenAt: Date.now(),
                    rightAt: Date.now(),
                    statusHistory: (
                      currentCharacter?.statusHistory || []
                    ).concat({
                      type: "status-change",
                      createdAt: Date.now(),
                      newStatus: "DISCOVERED",
                      oldStatus: currentCharacter?.status,
                    }),
                    rightCount: (currentCharacter?.rightCount || 0) + 1,
                  } as any);
                }}
              >
                {updateCharacterStatusMutation.isLoading ? (
                  <Icons.spinner spinPulse />
                ) : (
                  <Icons.powerOff />
                )}
              </button>
            )}

            {learnedChar && characterId?.length === 1 && (
              <SelectedCharacterStoryButton characterId={characterId} />
            )}

            <SelectedCharacterContentsButton characterId={characterId} />
          </div>

          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
      </div>
    </TheDock>
  );
};
