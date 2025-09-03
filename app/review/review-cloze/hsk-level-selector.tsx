import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useMemo } from "react";
import { useHskLevel } from "../use-review-mode";
import { shuffleArray } from "./utils/shuffle-array";

const hskLevels = [
  {
    title: "HSK 1",
    value: "1",
  },
  {
    title: "HSK 2",
    value: "2",
  },
  {
    title: "HSK 3",
    value: "3",
  },
  {
    title: "HSK 4",
    value: "4",
  },
  {
    title: "HSK 5",
    value: "5",
  },
  {
    title: "HSK 6",
    value: "6",
  },
  {
    title: "HSK 7-9",
    value: "9",
  },
  {
    title: "All",
    value: "0",
  },
];
export const HskLevelSelector = ({
  currentCharacter,
}: {
  currentCharacter: string;
}) => {
  const { data: hskWords } = useListHSKWordsQuery();

  const { hskLevel, setHskLevel } = useHskLevel();

  const relevantHskWords = useMemo(
    () =>
      shuffleArray(
        hskWords?.filter((word: any) =>
          JSON.stringify(word)?.includes(currentCharacter)
        ) || []
      ),
    [currentCharacter, hskWords]
  );

  const modifiedHskLevels = hskLevels.map((level) => {
    const totalWords = relevantHskWords.filter((word: any) => {
      return word?.hskLevel <= level.value;
    });

    const totalWordsLength = totalWords?.length;
    return {
      ...level,
      title:
        level.value === "0"
          ? level.title
          : `${level.title} (${totalWordsLength})`,
    };
  });

  return (
    <Select
      value={hskLevel}
      onValueChange={(value) => {
        setHskLevel(value);
      }}
    >
      <SelectTrigger className="w-[180px] rounded-full text-sm">
        <SelectValue placeholder="Select a level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>HSK Level</SelectLabel>
          {modifiedHskLevels.map((level) => {
            return (
              <SelectItem key={level.title} value={level.value}>
                {level.title}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
