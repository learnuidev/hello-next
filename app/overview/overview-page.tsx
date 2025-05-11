"use client";

import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";
import Link from "next/link";
import { useMemo } from "react";
import { useRecentlyWatchedContent } from "../(auth)/convos/use-recently-watched-content-store";
import { useGetTotalLifetimeCharacters } from "../profile/hooks/use-get-total-lifetime-characters";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { formatPercentage } from "../profile/utils/format-percentage";
import { useListComponents } from "@/domain/lesson/component.queries";
import { Icons } from "@/components/ui/icons.v2";
import { isYoutube } from "../(auth)/convos/utils/is-youtube";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { SearchBar } from "@/components/search-bar";

const TEN = 10;

function ContentIcon({ content }: { content: any }) {
  if (isYoutube(content?.audio)) {
    return <Icons.youtube />;
  }

  return <Icons.music />;
}

export const OverviewPage = () => {
  const { data: profile } = useGetAuthUserProfileQuery();

  const userEmailHandle = useMemo(
    () => profile?.email?.split("@")?.[0],
    [profile?.email]
  );

  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const { recentlyWatched, setRecentlyWatched } = useRecentlyWatchedContent();

  const topFiveRecentlyWatched = useMemo(
    () => recentlyWatched?.slice(0, TEN),
    [recentlyWatched]
  );
  const { data: totalComponents, isLoading: isComponentsLoading } =
    useListComponents();

  const { data: totalCharacters, isLoading: isCharactersLoading } =
    useListCharactersQuery();
  const lifeTimeCharacters = useGetTotalLifetimeCharacters();

  const reviewedCharacters = useMemo(
    () =>
      totalCharacters?.filter((character: any) => {
        return character?.reviewHistory?.length > 0;
      }) || [],
    [totalCharacters]
  );
  const totalReviedCharacters = useMemo(
    () => reviewedCharacters?.length || 0,
    [reviewedCharacters?.length]
  );

  const characterReviewRatio = formatPercentage(
    totalReviedCharacters / lifeTimeCharacters
  );

  const totalComponentsLength = useMemo(
    () => totalComponents?.length || 1,
    [totalComponents?.length]
  );

  const characterLearningRatio = formatPercentage(
    lifeTimeCharacters / totalComponentsLength
  );

  const masteredCharacters = useMemo(() => {
    return (
      totalCharacters?.filter(
        (character: any) => character?.status === "forgotten"
      )?.length || 0
    );
  }, [totalCharacters]);

  const characterMasteryRatio = formatPercentage(
    masteredCharacters / lifeTimeCharacters
  );

  const averageCharacterReview = useMemo(() => {
    const totalReviewCounts = reviewedCharacters
      ?.map((item) => item?.reviewHistory?.length)
      ?.reduce((acc: any, curr: any) => acc + curr, 0);
    return (totalReviewCounts / reviewedCharacters?.length).toFixed(2);
  }, [reviewedCharacters]);

  if (isCharactersLoading || isComponentsLoading) {
    return <div className="text-center my-32"> loading facts... </div>;
  }

  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <div className="w-full flex justify-start">
        <SearchBar />
      </div>
      {userEmailHandle && (
        <div className="mt-8 sm:mb-8 lg:mb-12 text-lg rounded-2xl p-4 lg:p-8">
          <p className="font-extralight">
            Yo <span className="font-bold">{userEmailHandle}</span>, here is
            your learning summary:{" "}
          </p>
        </div>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-12 mt-0 sm:mt-4 gap-4 lg:gap-12">
        <div className="sm:col-span-6 shadow-lg dark:shadow-[rgb(31,32,33)] rounded-2xl p-4 lg:p-8">
          <h2 className="mb-6 text-xl dark:text-gray-500 font-bold underline">
            facts
          </h2>

          {lifeTimeCharacters && totalComponents ? (
            <div className="flex gap-4 flex-col font-light text-[16px]">
              <p>
                <span className="mr-1">
                  <Icons.lightBulb />{" "}
                </span>
                You have learned{" "}
                <span className="font-bold">{lifeTimeCharacters}</span>{" "}
                characters out of{" "}
                <span className="font-bold">{totalComponentsLength}</span>,
                which represents a character learning percentage{" "}
                <span className="font-bold">{characterLearningRatio}</span>
              </p>

              <p>
                <span className="mr-1">
                  <Icons.fire />{" "}
                </span>
                Out of the{" "}
                <span className="font-bold">{lifeTimeCharacters}</span> learned
                characters, you have reviewed{" "}
                <span className="font-bold">
                  {totalReviedCharacters} ({characterReviewRatio})
                </span>{" "}
                and mastered{" "}
                <span className="font-bold">
                  {" "}
                  {masteredCharacters} ({characterMasteryRatio})
                </span>
                .
              </p>
              <p>
                <span className="mr-1">
                  <Icons.glassesRound />{" "}
                </span>
                You have reviewed an average of{" "}
                <span className="font-bold">{averageCharacterReview}</span>{" "}
                times per character.
              </p>
            </div>
          ) : (
            <div>Nothing here, yet. Please learn some characters first</div>
          )}
        </div>

        <div className="sm:col-span-1"></div>

        <div className="sm:col-span-5 shadow-lg dark:shadow-[rgb(31,32,33)] rounded-2xl p-4 lg:p-8">
          <h2 className="mb-6 text-xl dark:text-gray-500 font-bold underline">
            recently viewed content
          </h2>
          {topFiveRecentlyWatched?.length === 0 ? (
            <div>
              <h4>You havent watched any content </h4>

              <p>
                Click <Link href="/convos">here</Link> to get started
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-[16px]">
              {topFiveRecentlyWatched?.map((content: any) => {
                return (
                  <Link
                    onClick={() => {
                      setRecentlyWatched(content);
                    }}
                    key={content.id}
                    href={`/convos/${content?.id}`}
                  >
                    <span className="mr-1">
                      <ContentIcon content={content} />{" "}
                    </span>
                    {content?.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
