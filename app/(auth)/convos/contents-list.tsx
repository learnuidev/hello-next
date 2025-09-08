"use client";

import "@/libs/cognito/init";

import { useToast } from "@/hooks/use-toast";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";

import { useSearchQueryStore } from "@/components/search/state";
import { Icons } from "@/components/ui/icons.v2";
import { useListContentsQuery } from "@/domain/content/content.queries";

import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import Link from "next/link";
import { useListFavouriteContentsQuery } from "./[content-id]/hooks/use-list-favourited-contents-query";
import { useListPublishedContentsQuery } from "./[content-id]/hooks/use-list-published-contents-query";
import { useToggleFavouriteContentMutation } from "./[content-id]/hooks/use-toggle-favourite-content-mutation";
import { contentTypes } from "./constants/content-types";
import { useContentViewType } from "./hooks/use-content-view-type";
import { useRecentlyWatchedContent } from "./use-recently-watched-content-store";

type ContentType = {
  title: string;
  id: string;
  transcriptions?: any;
  type: string;
};

export function ContentsList({ contentViewType }: { contentViewType: string }) {
  const { data: myContent, isLoading } = useListContentsQuery();
  const { data, isLoading: isPublishedLoading } = useListPublishedContentsQuery(
    {}
  );
  const { data: favouriteContents, isLoading: isFavouriteContentLoading } =
    useListFavouriteContentsQuery({});

  const { toast } = useToast();
  const toggleFavouritContentMutation = useToggleFavouriteContentMutation();

  const { recentlyWatched, setRecentlyWatched } = useRecentlyWatchedContent();

  const { mode, setMode } = useLearningMode();

  const contents =
    contentViewType === "history"
      ? recentlyWatched
      : contentViewType === "public"
        ? data?.items
        : contentViewType === "favourites"
          ? favouriteContents?.items
          : myContent?.items;

  const { contentViewType: contentType } = useContentViewType();

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
                      setRecentlyWatched(item);
                      setMode(item.id);
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
                    src={
                      item?.thumbnails?.standard?.url ||
                      item?.thumbnails?.high?.url ||
                      item?.thumbnails?.medium?.url ||
                      item?.thumbnails?.default?.url ||
                      item?.thumbnails?.maxres?.url ||
                      item?.thumbnails?.[0]?.url ||
                      defaultPic
                    }
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
