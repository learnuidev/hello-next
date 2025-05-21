"use client";

import { Icons } from "@/components/ui/icons.v2";
import { ICharacter } from "@/domain/lesson/character.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import Link from "next/link";
import { useMemo } from "react";
import { calculateTotalMasteryDate } from "./utils/calculate-total-mastery-date";

export function AverageMasteryDays({
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
