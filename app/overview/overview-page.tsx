"use client";

import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";

import { differenceInDays } from "date-fns";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useRecentlyWatchedContent } from "../(auth)/convos/use-recently-watched-content-store";
import { useGetTotalLifetimeCharacters } from "../profile/hooks/use-get-total-lifetime-characters";
import {
  ICharacter,
  useListCharactersQuery,
} from "@/domain/lesson/character.queries";
import { formatPercentage } from "../profile/utils/format-percentage";
import { useListComponents } from "@/domain/lesson/component.queries";
import { Icons } from "@/components/ui/icons.v2";
import { isYoutube } from "../(auth)/convos/utils/is-youtube";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { SearchBar } from "@/components/search-bar";
import { LottieLoadingAnimation } from "../nmm/lottie-loading-animation";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { calculateTotalMasteryDate } from "./utils/calculate-total-mastery-date";

const TEN = 10;

function AverageMasteryDays({
  masteredCharacters: _masteredCharacters,
}: {
  masteredCharacters: ICharacter[];
}) {
  const lang = useGetCurrentLang();
  const masteredCharacters = useMemo(() => {
    return _masteredCharacters.filter(
      (char) => char?.reviewHistory?.length > 0
    );
  }, [_masteredCharacters]);

  const {
    averageMasteryAttempts,
    maxReviewedCharacters,
    maxReviewAttempt,
    minReviewedCharacters,
    minReviewAttempt,
    averageMasteryDays,
  } = useMemo(() => {
    const total = masteredCharacters?.length;

    const totalDaysArray = masteredCharacters?.map(
      (item) => item?.reviewHistory?.length || 0
    );

    const maxReviewAttempt = Math.max(...totalDaysArray);
    const minReviewAttempt = Math.min(...totalDaysArray);

    const maxReviewedCharacters = masteredCharacters?.filter(
      (character) => character?.reviewHistory?.length === maxReviewAttempt
    );
    const minReviewedCharacters = masteredCharacters?.filter(
      (character) => character?.reviewHistory?.length === minReviewAttempt
    );

    const totalMasteryDaysArray = masteredCharacters.map((character) =>
      calculateTotalMasteryDate(character)
    );

    const totalMasteryDays =
      totalMasteryDaysArray?.reduce((acc, curr: any) => acc + curr, 0) || 0;

    const averageMasteryDays = (totalMasteryDays / total)?.toFixed(1);

    const totalDays =
      totalDaysArray?.reduce((acc, curr: any) => acc + curr, 0) || 0;

    return {
      averageMasteryAttempts: (totalDays / total).toFixed(1),
      maxReviewedCharacters,
      maxReviewAttempt,
      minReviewAttempt,
      minReviewedCharacters,
      averageMasteryDays,
    };
  }, [masteredCharacters]);

  const maximumReviwedHanzi = useMemo(() => {
    const maxReviewChar = maxReviewedCharacters?.[0];
    return maxReviewChar?.hanzi || maxReviewChar?.input || "";
  }, [maxReviewedCharacters]);

  const maxReviewDay = useMemo(() => {
    return calculateTotalMasteryDate(maxReviewedCharacters?.[0]);
  }, [maxReviewedCharacters]);

  const minimumReviwedHanzis = useMemo(() => {
    return minReviewedCharacters?.map((item) => item?.hanzi || item?.input);
  }, [minReviewedCharacters]);

  return (
    <div>
      <p>
        <span className="mr-1">
          <Icons.fireDuoTone />{" "}
        </span>
        On average, it took you{" "}
        <span className="font-bold"> {averageMasteryDays} </span> days and{" "}
        <span className="font-bold">{averageMasteryAttempts} </span>
        attempts to master each character. The character{" "}
        <span className="font-bold">
          <Link
            target="_blank"
            href={`/nmm/${encodeURIComponent(maximumReviwedHanzi)}?lang=${lang}`}
          >
            {maximumReviwedHanzi}
          </Link>
        </span>{" "}
        required the most effort, taking{" "}
        <span className="font-bold">{maxReviewAttempt}</span> attempts and{" "}
        <span className="font-bold">{maxReviewDay}</span> days to achieve
        mastery.
      </p>
    </div>
  );
}

function UserLearningSummary() {
  const { data: profile } = useGetAuthUserProfileQuery();

  const userEmailHandle = useMemo(
    () => profile?.email?.split("@")?.[0],
    [profile?.email]
  );

  if (userEmailHandle) {
    return (
      <div className="mt-8 mb-8 text-lg rounded-2xl py-4 lg:py-8">
        <p className="font-extralight">
          Yo <span className="font-bold">{userEmailHandle}</span>, here is your
          learning summary:{" "}
        </p>
      </div>
    );
  }
}

function ContentIcon({ content }: { content: any }) {
  if (isYoutube(content?.audio)) {
    return <Icons.youtube />;
  }

  return <Icons.music />;
}

export const OverviewPage = () => {
  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const { recentlyWatched, setRecentlyWatched } = useRecentlyWatchedContent();

  const topFiveRecentlyWatched = useMemo(
    () => recentlyWatched?.slice(0, TEN),
    [recentlyWatched]
  );
  const { data: totalComponents, isLoading: isComponentsLoading } =
    useListComponents({ singleItemsOnly: true });

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

  // const totalComponentsLength = useMemo(() => 3200, []);
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
      ) || []
    );
  }, [totalCharacters]);

  const totalMasteredCharacters = useMemo(() => {
    return masteredCharacters?.length || 0;
  }, [masteredCharacters?.length]);

  const characterMasteryRatio = formatPercentage(
    totalMasteredCharacters / lifeTimeCharacters
  );

  const averageCharacterReview = useMemo(() => {
    const totalReviewCounts = reviewedCharacters
      ?.map((item) => item?.reviewHistory?.length)
      ?.reduce((acc: any, curr: any) => acc + curr, 0);
    return (totalReviewCounts / reviewedCharacters?.length).toFixed(2);
  }, [reviewedCharacters]);

  if (isCharactersLoading || isComponentsLoading) {
    return (
      <div className="text-center">
        <div>
          <LottieLoadingAnimation />
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <div className="w-full flex justify-start">
        <SearchBar />
      </div>
      <UserLearningSummary />

      <section className="grid grid-cols-1 sm:grid-cols-12 mt-0 sm:mt-4 gap-4 lg:gap-12">
        <div className="sm:col-span-7  dark:bg-[rgb(11,12,13)] bg-gray-50 rounded-2xl p-4 lg:p-8">
          <h2 className="mb-6 text-xl dark:text-gray-500 font-bold underline">
            facts
          </h2>

          {lifeTimeCharacters ? (
            <div className="max-w-xl flex gap-4 flex-col font-light text-[16px]">
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
                  {totalMasteredCharacters} ({characterMasteryRatio})
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

              <AverageMasteryDays masteredCharacters={masteredCharacters} />
            </div>
          ) : (
            <div>Nothing here, yet. Please learn some characters first</div>
          )}
        </div>

        {/* <div className="sm:col-span-1"></div> */}

        <div className="sm:col-span-5  dark:bg-[rgb(11,12,13)] bg-gray-50 rounded-2xl p-4 lg:p-8">
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
