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

  const { recentlyWatched } = useRecentlyWatchedContent();

  const topFiveRecentlyWatched = useMemo(
    () => recentlyWatched?.slice(0, TEN),
    [recentlyWatched]
  );
  const { data: totalComponents } = useListComponents();

  const { data: totalCharacters, isLoading: isCharactersLoading } =
    useListCharactersQuery();
  const lifeTimeCharacters = useGetTotalLifetimeCharacters();

  const totalReviedCharacters = useMemo(
    () =>
      totalCharacters?.filter((character: any) => {
        return character?.reviewHistory?.length > 0;
      })?.length || 0,
    [totalCharacters]
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

  return (
    <div className="mx-2 sm:mx-12">
      {userEmailHandle && (
        <div className="mt-8 mb-12 sm:text-lg lg:text-2xl shadow-sm rounded-2xl p-4">
          <p>
            Yo <span className="font-bold">{userEmailHandle}</span>, here is
            your learning summary:{" "}
          </p>
        </div>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-12 mt-4 gap-12">
        <div className="sm:col-span-6 shadow-sm rounded-2xl p-4">
          <h2 className="mb-4 text-xl dark:text-gray-500 font-bold underline">
            facts
          </h2>

          {isCharactersLoading ? (
            <div className="text-center"> loading facts... </div>
          ) : lifeTimeCharacters ? (
            <div className="flex gap-4 flex-col">
              <p>
                <span>
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
                <span>
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
            </div>
          ) : (
            <div>Nothing here, yet. Please learn some characters first</div>
          )}
        </div>

        <div className="sm:col-span-1"></div>

        <div className="sm:col-span-5 shadow-sm rounded-2xl p-4">
          <h2 className="mb-4 text-xl dark:text-gray-500 font-bold underline">
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
            <div>
              {topFiveRecentlyWatched?.map((content: any) => {
                return (
                  <Link key={content.id} href={`/convos/${content?.id}`}>
                    <span className="mr-2">
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
