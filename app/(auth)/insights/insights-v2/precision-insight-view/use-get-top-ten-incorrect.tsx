import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export const useGetTopTenIncorrect = () => {
  const { data: learnedCharacters } = useListCharactersQuery();

  return learnedCharacters
    ?.sort((a, b) => {
      const totalAIncorrect = a?.reviewHistory?.filter(
        (x) => x.outcome === "incorrect"
      );
      const totalBIncorrect = b?.reviewHistory?.filter(
        (x) => x.outcome === "incorrect"
      );
      return (totalBIncorrect?.length || 0) - (totalAIncorrect?.length || 0);
    })
    ?.slice(0, 8)
    ?.map((val) => {
      const totalIncorrect = val?.reviewHistory?.filter(
        (hist) => hist.outcome === "incorrect"
      )?.length;
      const totalCorrect = val?.reviewHistory?.filter(
        (hist) => hist.outcome === "correct"
      )?.length;

      const totalAttempts = val?.reviewHistory?.length || 0;

      const failureRate = (
        ((totalIncorrect || 0) / (totalAttempts || 1)) *
        100
      ).toFixed(1);

      return {
        ...val,
        totalAttempts: val?.reviewHistory?.length,
        totalIncorrect,
        totalCorrect,
        failureRate,
      };
    });
};
