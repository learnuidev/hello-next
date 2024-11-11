import { Editor } from "@/components/Editor";
import { MemoizedReactMarkdown } from "@/components/markdown";
import { Icons } from "@/components/ui/icons.v2";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetComponentQuery } from "@/domain/lesson/use-get-component-query";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useRouter } from "next/navigation";

function CharacterSummary({ characterId }: { characterId: string }) {
  const lang = useGetCurrentLang();

  const { data: meaning, isLoading } = useListMeaningsQuery({
    content: characterId,
    lang,
  });

  const { data: selectedComp, isLoading: isComponentsLoading } =
    useGetComponentQuery({
      componentId: characterId,
    });

  const meaningResponse = meaning as ListMeaningsResponse;

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <div className="flex flex-col">
          <Skeleton className="rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-7/12 bg-gray-800" />
            <Skeleton className="h-6 w-9/12 bg-gray-800" />
            <Skeleton className="h-12 w-10/12 bg-gray-800" />
          </div>
        </div>
        <div className="flex flex-col">
          <Skeleton className="rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-4/12 bg-gray-800" />
            <Skeleton className="h-6 w-7/12 bg-gray-800" />
            <Skeleton className="h-12 w-6/12 bg-gray-800" />
          </div>
        </div>
        <div className="flex flex-col">
          <Skeleton className="rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/12 bg-gray-800" />
            <Skeleton className="h-6 w-8/12 bg-gray-800" />
            <Skeleton className="h-12 w-4/12 bg-gray-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    meaningResponse?.summary.length &&
    selectedComp?.en !== meaningResponse?.summary && (
      <div className=" bg-[rgb(11,11,15)] rounded-lg p-8">
        <Editor
          className="max-w-4xl"
          readOnly={true}
          content={meaningResponse?.summary || ""}
        />
      </div>
    )
  );

  return (
    selectedComp?.en !== meaningResponse?.summary && (
      <div className="my-8">
        <MemoizedReactMarkdown className="prose-sm prose-neutral prose-a:text-accent-foreground/50 max-w-5xl">
          {meaningResponse?.summary}
        </MemoizedReactMarkdown>
      </div>
    )
  );
}

export const NMMV2 = ({ characterId }: { characterId: string }) => {
  const { data: selectedComp, isLoading: isComponentsLoading } =
    useGetComponentQuery({
      componentId: characterId,
    });

  const router = useRouter();

  return (
    <div className="md:mx-32 sm:mx-8  relative h-full">
      <nav className="flex items-center justify-between my-8 md:mx-0 mx-4">
        {characterId?.length <= 2 ? (
          <div className="flex items-center space-x-2">
            <button
              className="mr-8"
              onClick={() => {
                router.push("/nmm");
              }}
            >
              <Icons.back className="hover:text-white text-gray-400 text-xl" />
            </button>
            <h1 className="pr-4 text-2xl">{characterId}</h1>

            <h2 className="font-bold">{selectedComp?.pinyin}</h2>
            <h2 className="font-light text-gray-400">{selectedComp?.en}</h2>
          </div>
        ) : (
          <div className="flex items-end space-x-2">
            <button
              className="mr-8"
              onClick={() => {
                router.push("/nmm");
              }}
            >
              <Icons.back className="hover:text-white text-gray-400 text-xl" />
            </button>
          </div>
        )}

        <div className="hidden md:block space-x-8 text-gray-400 font-light text-sm bg-[rgb(11,11,15)] rounded-full">
          <button>About</button>
          <button>Sentences</button>
          <button>Story</button>
          <button>Search</button>
        </div>
      </nav>

      {characterId?.length > 2 && (
        <div className="flex flex-col">
          <h1 className="text-2xl">{characterId}</h1>

          <h2 className="font-bold">{selectedComp?.pinyin}</h2>
          <h2 className="font-light text-gray-400">{selectedComp?.en}</h2>
        </div>
      )}

      <CharacterSummary characterId={characterId} />

      <div className="md:hidden block absolute bottom-4 bg-[rgb(11,11,15)] rounded-full w-full h-16">
        <div className="pt-6 mx-12 flex w-full justify-center md:block space-x-12 text-gray-400 font-light text-sm">
          <button>About</button>
          <button>Sentences</button>
          <button>Story</button>
          <button>Search</button>
        </div>
      </div>

      {/* <div>
        <code>
          <pre>{JSON.stringify(selectedComp, null, 2)}</pre>
        </code>
      </div> */}
    </div>
  );
};
