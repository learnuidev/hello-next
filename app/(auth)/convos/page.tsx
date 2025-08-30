// import Image from 'next/image'
"use client";

import "@/libs/cognito/init";

import { useState } from "react";

import { NavBar } from "@/components/navbar";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { useConvosStore } from "@/stores/convos-store";
import { ConvoDetails } from "./convo-details";
import { ConvosNavBar } from "./convos-nav-bar";
import { useSelectedCharacter } from "./use-selected-character";

import { formatPercentage } from "@/app/insights-overview/utils/format-percentage";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";

import { useSearchQueryStore } from "@/components/search/state";
import { PlusIcon } from "@/components/ui/icons";
import { Icons } from "@/components/ui/icons.v2";
import { useListContentsQuery } from "@/domain/content/content.queries";

import { useIsNewContentFormEnabled } from "@/libs/posthog/hooks/use-is-new-content-form-enabled";

import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useListPublishedContentsQuery } from "./[content-id]/hooks/use-list-published-contents-query";
import { useViewModeStore } from "./new-convo/use-viewmode-store";
// import { useListFavouriteContentsQuery } from "./[content-id]/hooks/use-list-favourited-contents-query.ts";
import { createIndexDBStore } from "@/libs/index-db/index-db";
import Link from "next/link";
import { useListFavouriteContentsQuery } from "./[content-id]/hooks/use-list-favourited-contents-query";
import { contentTypes } from "./constants/content-types";
import { useContentType } from "./hooks/use-content-type";
import { NewContentV2 } from "./new-content-v2/new-content-v2";
import { useRecentlyWatchedContent } from "./use-recently-watched-content-store";
import { useToggleFavouriteContentMutation } from "./[content-id]/hooks/use-toggle-favourite-content-mutation";
// import { NewConvoV2 } from "./new-content-v2/new-convo-v2";

type ContentType = {
  title: string;
  id: string;
  transcriptions?: any;
  type: string;
};

function ContentsList({ contentViewType }: { contentViewType: string }) {
  const { data: myContent, isLoading } = useListContentsQuery();
  const { data, isLoading: isPublishedLoading } = useListPublishedContentsQuery(
    {}
  );
  const { data: favouriteContents, isLoading: isFavouriteContentLoading } =
    useListFavouriteContentsQuery({});

  const { toast } = useToast();
  const toggleFavouritContentMutation = useToggleFavouriteContentMutation();

  const { recentlyWatched, setRecentlyWatched } = useRecentlyWatchedContent();

  const contents =
    contentViewType === "history"
      ? recentlyWatched
      : contentViewType === "public"
        ? data?.items
        : contentViewType === "favourites"
          ? favouriteContents?.items
          : myContent?.items;

  const { contentType } = useContentType();

  // const contentType = useContentTypeStore((state) => state.contentType);

  const query = useSearchQueryStore((state) => state.query2);
  const lang = useGetCurrentLang();

  const searchTransacription = (content: ContentType, query: string) => {
    if (!content?.transcriptions?.length) {
      return false;
    }

    return true;
  };

  const filteredByLang = (contents || [])?.filter((item: any) => {
    if (contentViewType === "history") {
      return true;
    }

    return item?.lang === lang;
  });

  const projects = filteredByLang
    ?.filter((content: any) => {
      if (!query) {
        if (contentType) {
          if (contentType === "all") {
            return true;
          }

          return (
            contentType === content?.type ||
            contentType === content?.contentType
          );
        }

        return true;
      }

      return JSON.stringify(content)
        ?.toLowerCase()
        ?.includes(query?.toLowerCase());

      return (
        content?.title?.toLowerCase()?.includes(query?.toLowerCase()) &&
        searchTransacription(content, query)
      );
    })

    ?.map((content: any) => {
      return {
        id: content?.id,
        title: content?.title,
        description: content?.summary || content?.description || content?.title,
        link: `/convos/${content?.id}`,
        ...content,
      };
    });

  if (isLoading || isFavouriteContentLoading || isPublishedLoading) {
    return <LottieLoadingAnimation />;
  }

  if (contentViewType === "favourites" && projects?.length === 0) {
    return <Nothing message={`Nothing favourited`} icon={Icons.content} />;
  }

  const selectedContent = contentTypes?.find(
    (content) => content.id === contentType
  );

  if (!projects?.length) {
    return (
      <Nothing
        message={`Nothing found for: ${query || selectedContent?.title || contentType}`}
        icon={Icons.content}
      />
    );
  }

  const defaultPic = `https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K3WRT0WY9NFBA55Y1DWYJ4MG.png`;

  return (
    <div className="max-w-5xl mx-auto px-8">
      <section className="">
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-4 gap-y-4 lg:gap-8">
          {projects?.map((item: any) => {
            const isFavourited = favouriteContents?.items?.find(
              (content: any) => content?.id === item.id
            );
            return (
              <div
                key={JSON.stringify(item)}
                className="block col-span-3 lg:col-span-2"
              >
                <Link
                  href={`/convos/${item?.id}`}
                  className="block relative"
                  onClick={(event) => {
                    if (!event.defaultPrevented) {
                      console.log("yoo");
                      setRecentlyWatched(item);
                    }
                  }}
                >
                  <button
                    disabled={toggleFavouritContentMutation.isPending}
                    className="text-xl z-50 absolute right-2 top-2"
                    onClick={(event) => {
                      event.preventDefault();
                      if (isFavourited) {
                        toggleFavouritContentMutation
                          .mutateAsync({
                            type: "unfavourite",
                            contentId: item?.id,
                          })
                          .then(() => {
                            toast({
                              title: "Success",
                              description: "Content successfully unfavourited",
                            });
                          });
                      } else {
                        toggleFavouritContentMutation
                          .mutateAsync({
                            type: "favourite",
                            contentId: item?.id,
                          })
                          .then(() => {
                            toast({
                              title: "Success",
                              description: "Content successfully favourited",
                            });
                          });
                      }
                    }}
                  >
                    {isFavourited ? <Icons.heartSolid /> : <Icons.heart />}
                  </button>
                  <img
                    className="object-cover rounded-xl w-full aspect-video"
                    src={item?.thumbnails?.maxres?.url || defaultPic}
                    alt={item?.title}
                  />
                </Link>

                <div>
                  <p className="mt-2 truncate">
                    {" "}
                    <span>{item?.title}</span>
                  </p>
                  <p className="font-light text-gray-400 text-sm capitalize">
                    {" "}
                    <span>{item?.lang}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function LessonCard({ lesson }: any) {
  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const lessonId = useConvosStore((state: any) => state?.convoId);
  const setLessonId = useConvosStore((state: any) => state?.setConvoId);

  const router = useRouter();

  const totalLessonsLength = lesson?.transcriptions?.length;

  const completedLessons = lesson?.transcriptions?.filter((phrase: any) =>
    allAnswers?.find(
      (answer: any) =>
        answer?.phraseId === phrase?.id && answer?.status === "correct"
    )
  );

  const uncompletedLessons = lesson?.transcriptions?.filter(
    (phrase: any) =>
      !completedLessons?.find(
        (completedPhrase: any) => completedPhrase?.id === phrase?.id
      )
  );

  const firstUnCompletedLesson = uncompletedLessons?.[0];

  const percentCompleted = completedLessons?.length / totalLessonsLength || 0;
  return (
    <button
      onClick={() => {
        setLessonId(lesson?.id);
        router.push(`/convos/${lesson?.id}`);
      }}
      className="px-4 md:px-32 font-light flex justify-between items-center w-full md:mt-2"
    >
      <h2 className="text-2xl">{lesson?.title}</h2>
      <p className="text-2xl">{formatPercentage(percentCompleted)}</p>
    </button>
  );
}

const useViewTypeStore = createIndexDBStore({
  name: "view-type",
  handler: (set: any, get: any) => ({
    viewType: "history",
    setViewType: (f: any) =>
      typeof f === "function"
        ? set({ viewType: f(get().viewType) })
        : set({ viewType: f }),
  }),
});

const useViewType = () => {
  const viewType = useViewTypeStore((state) => state.viewType);
  const setViewType = useViewTypeStore((state) => state.setViewType);

  return [viewType, setViewType] as any;
};

export default function Convos() {
  const [contentViewType, setViewType] = useViewType();

  const [isTocHidden, setIsTocHidden] = useState(false);
  const lessonId = useConvosStore((state: any) => state?.convoId);

  const viewMode = useViewModeStore((state: any) => state.viewMode);
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const routeName = usePathname();

  const isNewContentEnabled = useIsNewContentFormEnabled();

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };

  const ContentViewMode = () => {
    // if (isNewContentEnabled) {
    //   return <NewContent />;
    // }

    return <NewContentV2 />;
  };

  return viewMode === "convo/add" ? (
    <ContentViewMode />
  ) : (
    <main className="">
      <div className="flex space-x-4 px-4 md:px-12 mt-4">
        <button
          className={
            contentViewType === "public" ? "dark:text-white" : "text-gray-500"
          }
          onClick={() => {
            setViewType("public");
          }}
        >
          Public
        </button>
        <button
          className={
            contentViewType === "me" ? "dark:text-white" : "text-gray-500"
          }
          onClick={() => {
            setViewType("me");
          }}
        >
          Me
        </button>
        <button
          className={
            contentViewType === "history" ? "dark:text-white" : "text-gray-500"
          }
          onClick={() => {
            setViewType("history");
          }}
        >
          History
        </button>
        <button
          className={
            contentViewType === "favourites"
              ? "dark:text-white"
              : "text-gray-500"
          }
          onClick={() => {
            setViewType("favourites");
          }}
        >
          Favourites
        </button>
      </div>
      {selectedChar ? null : lessonId && routeName?.includes("/convos") ? (
        <ConvosNavBar />
      ) : (
        <NavBar />
      )}

      {selectedChar ? null : lessonId &&
        routeName?.includes("/convos") ? null : (
        <div className="px-4 md:px-8 mt-4">
          <button
            className="text-xl dark:hover:text-white md:px-4 py-1 dark:text-slate-600 shadow-md rounded-full"
            onClick={() => {
              setViewMode("convo/add");
            }}
          >
            <PlusIcon />
          </button>
        </div>
      )}

      {lessonId ? (
        <ConvoDetails lessonId={lessonId} />
      ) : (
        <div className="my-8 space-y-8">
          <ContentsList contentViewType={contentViewType} />
        </div>
      )}
    </main>
  );
}
