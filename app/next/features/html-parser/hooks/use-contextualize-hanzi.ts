import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListComponents } from "@/domain/lesson/component.queries";

const indexOfAllV2: any = (ctx: any, str: any, w: any, res = [] as any) => {
  const idx = str.indexOf(w);

  const wordLen = w.length;

  if (idx === -1) {
    return res;
  }
  const prevIndex = res?.length
    ? // ? (res || []).reduce((acc: any, curr: any) => acc + curr?.index, 0)
      res[res.length - 1]?.index
    : null;

  const newIndex =
    idx + (Number.isFinite(prevIndex) ? wordLen : 0) + (prevIndex || 0);

  if (newIndex >= ctx.length) {
    return res;
  }
  const updatedRes = res.concat({
    index: idx + (Number.isFinite(prevIndex) ? wordLen : 0) + (prevIndex || 0),
  });
  // const updatedRes = res.concat({ index: idx + (prevIndex || 0) })
  return indexOfAllV2(ctx, str.slice(idx + 1), w, updatedRes);
};

export const useContextualizeHanzi = (str: any) => {
  const { data: hskWords2 } = useListHSKWordsQuery();

  const { data: allChars } = useListComponents();

  return contextualizeHanzi(allChars, hskWords2, str);
};

export const contextualizeHanzi = (allChars: any, hskWords2: any, str: any) => {
  // const { data: hskWords2 } = useListHSKWordsQuery();

  // const { data: allChars } = useListComponents();

  const contextualized = [...(allChars || []), ...hskWords2]
    .map(({ hanzi, level }) => {
      const startingIndex = str.indexOf(hanzi);
      if (startingIndex !== -1) {
        const length = hanzi.length;
        const word2 = str.slice(startingIndex, startingIndex + length);

        const hskLevel = hskWords2?.find((word: any) => word?.hanzi === word2);

        const hmm = allChars
          ?.map((item: any, idx: any) => (item?.hanzi === word2 ? item : null))
          .filter(Boolean);
        const res = {
          hanzi: word2,

          startingIndex,
          endingIndex: startingIndex + length,
          hskLevel: hskLevel?.level,
          indexes: indexOfAllV2(str, str, hanzi),
          //   dictionary: dictionary?.[word2] || hskLevel,
          types: [],
          //   ...(hskLevel ? {} : hmm),
          ...hskLevel,
        } as any;

        return res;
      } else {
        // const word2 = str.slice(startingIndex, startingIndex + length);
        return {
          //   hanzi: word2,
          //   startingIndex,
          //   endingIndex: startingIndex + length,
          word: null,
        };
      }
    })
    .filter((word, idx, ctx) => Boolean(word?.hanzi) && word?.hskLevel)
    // .filter((word, idx, ctx) => Boolean(word?.hanzi))
    .sort((a, b) => a.startingIndex - b.startingIndex)
    .filter(
      (word, idx, ctx) => ctx.findIndex((v) => v.hanzi === word?.hanzi) === idx
    )
    ?.filter((item, idx, ctx) => {
      const moreThanTwo = ctx?.filter(
        (val) =>
          val?.hanzi?.includes(item?.hanzi) &&
          item?.startingIndex === val?.startingIndex
      );

      if (moreThanTwo?.length > 1) {
        return item?.hanzi?.length > 1;
      }

      return true;
    });

  //   return contextualized;

  return {
    contextualized,
    new: str
      ?.split("")
      ?.map((item: any, idx: any) => {
        const notInColl = contextualized?.find(
          (val) => val?.hanzi?.includes(item) && val?.startingIndex === idx
        );

        if (!notInColl) {
          return {
            hanzi: item,
            startingIndex: idx,
            endingIndex: idx + 1,
          };
        }

        return notInColl;
      })
      ?.filter((item: any, idx: any, ctx: any) => {
        if (idx === 0 || ctx?.length - 1 === idx) {
          return true;
        }

        if (item?.startingIndex < ctx?.[idx - 1]?.endingIndex) {
          return false;
        }

        return true;
      })
      ?.map((item: any) => {
        if (item?.en) {
          return item;
        }

        const char = allChars?.find((char: any) => char?.hanzi === item?.hanzi);

        if (char) {
          return {
            ...item,
            ...char,
          };
        }

        return item;
      }),
  };
};
