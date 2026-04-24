"use client";

import "@/libs/cognito/init";

import { useToast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";

import { useSearchQueryStore } from "@/components/search/state";
import { Icons } from "@/components/ui/icons.v2";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { motion } from "framer-motion";

import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import Link from "next/link";
import { useListFavouriteContentsQuery } from "./[content-id]/hooks/use-list-favourited-contents-query";
import { useListPublishedContentsQuery } from "./[content-id]/hooks/use-list-published-contents-query";
import { useToggleFavouriteContentMutation } from "./[content-id]/hooks/use-toggle-favourite-content-mutation";
import { contentTypes } from "./constants/content-types";
import { useContentViewType } from "./hooks/use-content-view-type";
import { useRecentlyWatchedContent } from "./use-recently-watched-content-store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultPic } from "@/data/default-image-urls";
import { useSearchSuggestions } from "@/hooks/use-search-suggestions";

type ContentType = {
  title: string;
  id: string;
  transcriptions?: any;
  type: string;
  author?: string;
  createdAt?: string;
};

type SortByType = "newest" | "oldest";

export function ContentsList({ contentViewType }: { contentViewType: string }) {
  const { data: myContent, isLoading } = useListContentsQuery();
  const { data, isLoading: isPublishedLoading } = useListPublishedContentsQuery(
    {},
  );
  const { data: favouriteContents, isLoading: isFavouriteContentLoading } =
    useListFavouriteContentsQuery({});

  const { data: authUser } = useCurrentAuthUser();

  const { toast } = useToast();
  const toggleFavouritContentMutation = useToggleFavouriteContentMutation();

  const { recentlyWatched, setRecentlyWatched } = useRecentlyWatchedContent();

  const { mode, setMode } = useLearningMode();

  const { contentViewType: contentType, setContentViewType } =
    useContentViewType();

  const query = useSearchQueryStore((state) => state.query2);
  const lang = useGetCurrentLang();

  const [sortBy, setSortBy] = useState<SortByType>("newest");
  const [authorFilter, setAuthorFilter] = useState<string>("all");

  const querySync = useSearchQueryStore((state) => state.querySync);

  const {
    isLoading: isSearchLoading,
    data: suggeestions,

    debouncedQuery,
  } = useSearchSuggestions(querySync);

  const contents =
    contentViewType === "history"
      ? recentlyWatched
      : contentViewType === "public"
        ? data?.items
        : contentViewType === "favourites"
          ? favouriteContents?.items
          : myContent?.items;

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

  const allAuthors = useMemo(() => {
    const authors = new Set<string>();
    filteredByLang?.forEach((item: any) => {
      if (item?.author) {
        authors.add(item.author);
      }
    });
    return Array.from(authors).sort();
  }, [filteredByLang]);

  const filteredProjects = filteredByLang
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
    ?.filter((content: any) => {
      if (authorFilter === "all") return true;
      return content?.author === authorFilter;
    })
    ?.map((content: any) => {
      return {
        id: content?.id,
        title: content?.title,
        description: content?.summary || content?.description || content?.title,
        link: `/convos/${content?.id}`,
        author: content?.author,
        createdAt: content?.createdAt,
        ...content,
      };
    });

  const sortedProjects = useMemo(() => {
    if (!filteredProjects) return [];
    const sorted = [...filteredProjects];
    if (sortBy === "newest") {
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      );
    } else {
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime(),
      );
    }
  }, [filteredProjects, sortBy]);

  const contentsList = querySync ? suggeestions : sortedProjects;

  if (
    isLoading ||
    isFavouriteContentLoading ||
    isPublishedLoading ||
    isSearchLoading
  ) {
    return <LottieLoadingAnimation />;
  }

  if (contentViewType === "favourites" && sortedProjects?.length === 0) {
    return <Nothing message={`Nothing favourited`} icon={Icons.content} />;
  }

  const selectedContent = contentTypes?.find(
    (content) => content.id === contentType,
  );

  return (
    <div>
      <div className="flex gap-4 mb-6 flex-wrap">
        <Select
          value={sortBy}
          onValueChange={(value: SortByType) => setSortBy(value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="排序" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">最新</SelectItem>
            <SelectItem value="oldest">最早</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={contentType || "all"}
          onValueChange={(value: string) => setContentViewType(value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有类型</SelectItem>
            {contentTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {allAuthors.length > 0 && (
          <Select value={authorFilter} onValueChange={setAuthorFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="按作者筛选" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有作者</SelectItem>
              {allAuthors.map((author) => (
                <SelectItem key={author} value={author}>
                  {author}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {!sortedProjects?.length ? (
        <Nothing
          message={`Nothing found for: ${query || selectedContent?.title || contentType}`}
          icon={Icons.content}
        />
      ) : (
        <section>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(32rem,1fr))] sm:grid-cols-[repeat(2,minmax(20rem,1fr))] gap-8">
            {contentsList?.map((item: any, index: number) => {
              const isFavourited = favouriteContents?.items?.find(
                (content: any) => content?.id === item.id,
              );

              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="dark:hover:bg-[rgb(14,15,16)] dark:bg-[rgb(11,12,13)] hover:bg-gray-100 bg-gray-50 flex flex-col sm:flex-row shadow rounded-lg overflow-hidden"
                >
                  <Link
                    href={`/convos/${item?.id}`}
                    className="flex flex-col sm:flex-row w-full"
                    onClick={(event) => {
                      if (!event.defaultPrevented) {
                        setRecentlyWatched(item);
                        setMode(item.id);
                      }
                    }}
                  >
                    <div className="p-2">
                      <div
                        className="aspect-square sm:w-40 sm:flex-shrink-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${
                            item?.coverPhotoUrl ||
                            item?.thumbnails?.standard?.url ||
                            item?.thumbnails?.high?.url ||
                            item?.thumbnails?.medium?.url ||
                            item?.thumbnails?.default?.url ||
                            item?.thumbnails?.maxres?.url ||
                            item?.thumbnails?.[0]?.url ||
                            defaultPic
                          })`,
                        }}
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-semibold text-lg truncate dark:text-white dark:hover:text-rose-500">
                          {item?.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <span className="capitalize">{item?.lang}</span>
                          {item?.author && (
                            <>
                              <span>•</span>
                              <span>{item.author}</span>
                            </>
                          )}
                        </div>
                        {item?.description && (
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <button
                        disabled={toggleFavouritContentMutation.isPending}
                        className="text-xl z-50 self-start mt-2"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          if (isFavourited) {
                            toggleFavouritContentMutation
                              .mutateAsync({
                                type: "unfavourite",
                                contentId: item?.id,
                              })
                              .then(() => {
                                toast({
                                  title: "Success",
                                  description:
                                    "Content successfully unfavourited",
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
                                  description:
                                    "Content successfully favourited",
                                });
                              });
                          }
                        }}
                      >
                        {isFavourited ? <Icons.heartSolid /> : <Icons.heart />}
                      </button>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
