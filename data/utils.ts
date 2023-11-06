import {
  allWords,
  allAdjectives,
  allAdverbs,
  allVerbs,
  allConjuctions,
  allMeasures,
  allMoods,
  allNouns,
  allNumbers,
  allParticles,
  // allChars,
  allPrepositions,
  allPronouns,
  // allSentences
} from "@/data/hmm/data/v1000";

import { yellowBelt as allChars } from "@/data/nmm/1200";
import { dictionary } from "@/data/hmm/data/dictionary";
import { hskLevel9Words2 } from "./hsk2";

import { hskWords2 } from "./hsk";

const indexOfAll: any = (str: any, w: any, res = [] as any) => {
  const idx = str.indexOf(w);

  const wordLen = w.length;

  if (idx === -1) {
    return res;
  }
  const prevIndex = res?.length
    ? (res || []).reduce((acc: any, curr: any) => acc + curr?.index, 0)
    : null;
  const updatedRes = res.concat({
    index: idx + (Number.isFinite(prevIndex) ? wordLen : 0) + (prevIndex || 0),
  });
  // const updatedRes = res.concat({ index: idx + (prevIndex || 0) })
  return indexOfAll(str.slice(idx + 1), w, updatedRes);
};

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

export const parse = (str: string) => {
  const allCharsyo = [...allChars, ...allWords, ...hskWords2]
    .map((props: any) => {
      const { hanzi, level } = props;
      const startingIndex = str.indexOf(hanzi);
      if (startingIndex !== -1) {
        const length = hanzi.length;
        const word2 = str.slice(startingIndex, startingIndex + length);

        const hskLevel = hskWords2?.find((word) => word?.hanzi === word2);

        const hmm = allChars?.find((item, idx) => item?.hanzi === word2);

        const res = {
          hanzi: word2,
          startingIndex,
          endingIndex: startingIndex + length,
          hskLevel: hskLevel?.level,
          indexes: indexOfAllV2(str, str, hanzi),
          dictionary: dictionary?.[word2] || hskLevel,
          types: [],
        } as any;

        if (hmm) {
          res.hmmCharacterLevel = hmm?.level;
        }

        const isVerb = allVerbs
          ?.map((item, idx) => (item?.hanzi === word2 ? { item, idx } : null))
          .filter(Boolean);

        if (isVerb.length) {
          res.types.push({
            type: "verb",
          });
        }

        const isWord = allWords?.find((item, idx) => item?.hanzi === word2);

        if (isWord) {
          // return res
          res.types.push({
            type: "word",
            // hanzi: isVerb[0]?.item?.hanzi,
            // verbIndex: isVerb[0]?.idx
          });
        }

        const getEntity = (entities: any) => {
          return entities?.find(
            (item: { hanzi: string }) => item?.hanzi === word2
          );
        };

        const grammarsAndCharacters = [
          { type: "character", entities: allChars },
          { type: "pronoun", entities: allPronouns },
          { type: "preposition", entities: allPrepositions },
          { type: "particle", entities: allParticles },
          { type: "number", entities: allNumbers },
          { type: "noun", entities: allNouns },
          { type: "mood", entities: allMoods },
          { type: "conjunction", entities: allConjuctions },
          { type: "adverb", entities: allAdverbs },
          { type: "adjective", entities: allAdjectives },
          { type: "measure", entities: allMeasures },
        ];

        grammarsAndCharacters.forEach((grammar) => {
          const isEntity = getEntity(grammar?.entities);

          if (isEntity) {
            res.types.push({
              type: grammar?.type,
            });
          }
        });

        return res;
      } else {
        const isInDictionary = props.en?.includes(str?.toLocaleLowerCase());

        if (isInDictionary) {
          return props;
        }
        return {
          word: null,
        };
      }
    })
    .filter((word, idx, ctx) => Boolean(word?.hanzi))
    // .filter((word, idx, ctx) => Boolean(word?.hanzi))
    .sort((a, b) => a.startingIndex - b.startingIndex)
    ?.sort((a, b) => a?.hmmCharacterLevel - b?.hmmCharacterLevel)
    .filter(
      (word, idx, ctx) => ctx.findIndex((v) => v.hanzi === word?.hanzi) === idx
    );

  return allCharsyo;
};

export const filterHmm = (str: any) => {
  switch (str) {
    case "word":
      return allWords;
    case "character":
      return allChars;
    case "pronoun":
      return allPronouns;
    case "conjunction":
      return allConjuctions;
    case "verb":
      return allVerbs;
    default:
      return allNouns;
  }
};
