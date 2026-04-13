import { Icons } from "./ui/icons.v2";

import { useCharacterContextStore } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { BookmarkButton } from "@/app/nmm/bookmark-button";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import {
  useAddCharacterMutation,
  useUpdateCharacterStatusMutation,
} from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useDeleteCharacterMutation } from "@/domain/lesson/use-delete-character-mutation";
import { useGetComponentQuery } from "@/domain/lesson/use-get-component-query";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";
import { useShowAutomaticallyTheDock } from "@/hooks/use-show-automatically-the-dock";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useCharacterEditStore } from "./_select-character/use-character-edit-store";
import { PreviewButton } from "./settings-dialog/preview-button";
import { TheDock } from "./the-dock";
import { useSelectedCharacterData } from "./use-selected-character";
import { useGetCharacterQuery } from "@/domain/character/use-get-character-query";

const DiscoverButton = ({ characterId }: { characterId: string }) => {
  const discoverMutation = useDiscoverMutation();

  const { data, isLoading } = useGetComponentQuery({
    hanzi: characterId,
  });

  if (characterId?.length > 3) {
    return null;
  }

  if (characterId?.length === 3 && data?.group) {
    return null;
  }

  if (data || isLoading) {
    return null;
  }

  return (
    <button
      className="text-xl text-gray-400 hover:text-black dark:hover:text-white"
      disabled={discoverMutation.isPending}
      onClick={() => {
        discoverMutation
          // @ts-ignore
          .mutateAsync({
            hanzi: characterId,
          })
          .then((resp: any) => {
            toast(`Component Successfully discovered ${JSON.stringify(resp)}`);
          });
      }}
    >
      {discoverMutation.isPending ? (
        <Icons.spinner spinPulse />
      ) : (
        <Icons.language />
      )}
    </button>
  );
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
    // isAlreadyLearned,
    setView,
    view,
    selectedComp2,
    lang,
    selectedChar,
    firstLesson,
  } = characterData;

  const { data: learnedChar } = useGetCharacterQuery({ hanzi: characterId });

  const isAlreadyLearned = !!learnedChar;

  const edit = useCharacterEditStore((state) => state.edit);

  const addCharacterMutation = useAddCharacterMutation();

  const deleteCharacterMutation = useDeleteCharacterMutation();

  const searchParams = useSearchParams();

  const context = searchParams?.get("context");

  const currentCharacter = selectedComp;

  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  const { data } = useListCharactersQuery();

  const isAutomatic = useShowAutomaticallyTheDock();

  const characterContext = useCharacterContextStore((state) => state.context);
  const contentContext = [
    ...new Set(
      characterContext
        ?.filter((item) =>
          JSON.stringify(item)?.includes(firstLesson?.hanzi || selectedChar),
        )
        .map((item) => JSON.stringify(item)),
    ),
  ]?.map((item) => JSON.parse(item));

  const isSuperAdmin = useIsSuperAdmin();

  return (
    <TheDock isAutomatic={isAutomatic} className="bottom-4">
      <div className="flex items-center w-full justify-center">
        <div className="px-8  py-2 bg-gray-100 dark:bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  dark:text-white inline-block">
          <div className="space-x-8 flex justify-center items-center w-full">
            {!edit && <BookmarkButton hanzi={characterId} lang={lang} />}

            <PreviewButton />

            <button
              className="text-xl text-black dark:text-white"
              onClick={() => {
                setView("review");
              }}
            >
              <Icons.graduationCap className="text-2xl" />
            </button>

            {firstLesson?.hanzi?.length !== 1 || isAlreadyLearned ? null : (
              <button
                className="text-xl text-black dark:text-white"
                disabled={addCharacterMutation.isPending}
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
                  } as any);
                }}
              >
                {addCharacterMutation.isPending ? (
                  <Icons.spinner spinPulse />
                ) : (
                  <Icons.lightBulb className="text-2xl" />
                )}
              </button>
            )}
            {!isAlreadyLearned ||
            currentCharacter?.status === "forgotten" ? null : (
              <button
                disabled={updateCharacterStatusMutation.isPending}
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
                {updateCharacterStatusMutation.isPending ? (
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
                disabled={deleteCharacterMutation.isPending}
                onDoubleClick={() => {
                  deleteCharacterMutation
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
                {deleteCharacterMutation.isPending ? (
                  <Icons.spinner spinPulse />
                ) : (
                  <Icons.trash />
                )}
              </button>
            )}
            {isSuperAdmin &&
              isAlreadyLearned &&
              currentCharacter?.status === "forgotten" && (
                <button
                  className="text-xl text-black dark:text-white"
                  disabled={updateCharacterStatusMutation.isPending}
                  onDoubleClick={() => {
                    updateCharacterStatusMutation.mutateAsync({
                      characterId: currentCharacter?.id,
                      status: "DISCOVERED",
                      next_review_date: Date.now(),
                      rediscoveredAt: Date.now(),
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
                  {updateCharacterStatusMutation.isPending ? (
                    <Icons.spinner spinPulse />
                  ) : (
                    <Icons.powerOff />
                  )}
                </button>
              )}
          </div>

          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
      </div>
    </TheDock>
  );
};
