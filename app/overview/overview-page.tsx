"use client";

import { SearchBar } from "@/components/search-bar";
import { LottieLoadingAnimation } from "../nmm/lottie-loading-animation";
import { AverageMasteryDays } from "./average-mastery-days";
import { AverageCharacterReview } from "./averate-character-review";
import { CharacterReviwedRatio } from "./character-review-ratio";
import { LifeTimeLearningFact } from "./life-time-learning-fact";
import { RecentlyViewedContent } from "./recently-viewed-content";
import { useGetFacts } from "./use-get-facts";
import { UserLearningSummary } from "./user-learning-summary";

export const OverviewPage = () => {
  const {
    averageCharacterReview,
    isLoading,
    lifeTimeCharacters,
    totalComponentsLength,
    characterLearningRatio,
    totalReviedCharacters,
    characterReviewRatio,
    totalMasteredCharacters,
    characterMasteryRatio,
    masteredCharacters,
  } = useGetFacts();

  if (isLoading) {
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
              {![
                lifeTimeCharacters,

                totalComponentsLength,
                characterLearningRatio,
              ]?.includes(NaN) && (
                <LifeTimeLearningFact
                  lifeTimeCharacters={lifeTimeCharacters}
                  totalComponentsLength={totalComponentsLength}
                  characterLearningRatio={characterLearningRatio}
                />
              )}

              {![
                lifeTimeCharacters,
                totalReviedCharacters,
                characterReviewRatio,
                totalMasteredCharacters,
                characterMasteryRatio,
              ]?.includes(NaN) && (
                <CharacterReviwedRatio
                  lifeTimeCharacters={lifeTimeCharacters}
                  totalReviedCharacters={totalReviedCharacters}
                  characterReviewRatio={characterReviewRatio}
                  totalMasteredCharacters={totalMasteredCharacters}
                  characterMasteryRatio={characterMasteryRatio}
                />
              )}

              <AverageCharacterReview
                averageCharacterReview={averageCharacterReview}
              />

              <AverageMasteryDays masteredCharacters={masteredCharacters} />
            </div>
          ) : (
            <div>Nothing here, yet. Please learn some characters first</div>
          )}
        </div>

        <RecentlyViewedContent />
      </section>

      {/* <Personalization /> */}
    </div>
  );
};
