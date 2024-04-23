"use client";
import React, { useMemo } from "react";

import { useState, useEffect } from "react";

import { useLessonHistoryStore } from "../speak/useLessonHistory";

import {
  nepaliVowels,
  nepaliConsonants,
  nepaliSentences,
  nepaliWords,
  nepaliWords1,
  // nepaliWords204,
  uniqueWords,
  dependentVowels,
  nepaliWords203,
} from "./data";
// import { NewPatra } from "../convos/NewPatra";
import { useWordsStore } from "./state";
import { cc, ccV3 } from "./cc";

import {
  PlayIcon,
  CCIcon,
  PinyinChartIcon,
  PlusIcon,
  SentenceIcon,
  WordIcon,
} from "../ui/icons";
const PageView = ({ view, setSelectedId }: any) => {
  const [viewMode, setViewMode] = useState("halant");
  const [variants, setVariants] = useState([]) as any;
  const [isHidden, toggleTranslation] = useState(false);
  const [isCoreOnly, toggleCore] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterCharacter, setFilterCharacter] = useState("");
  const [filterZeroes, toggleFilterZeroes] = useState(true);
  const [sortByPopularity, toggleSortPopularity] = useState(true);

  // const nepaliWords203 = useWordsStore((s) => s?.words);

  const nepaliWords204 = useMemo(() => {
    if (filterType === "consonants only") {
      return nepaliWords203
        ?.filter((prop: any) => {
          return prop?.nepali?.split("")?.every((nep: any) => {
            return nepaliConsonants?.find((c) => c.nepali === nep);
          });
        })
        ?.sort((a: any, b: any) => {
          return a?.nepali?.split("")?.length - b?.nepali?.split("")?.length;
        });
    }

    if (filterType !== "consonants only") {
      return nepaliWords203
        ?.filter((word: any) => {
          return (
            word?.nepali?.split("")?.includes(filterCharacter) ||
            word?.nepali?.includes(filterCharacter)
          );
        })
        ?.sort((a: any, b: any) => {
          return a?.nepali?.split("")?.length - b?.nepali?.split("")?.length;
        });
    }

    return nepaliWords203;
  }, [filterType, nepaliWords203, filterCharacter]) as any;

  const WORD_LEN = 0;

  const ccHal = useMemo(() => {
    const res = cc
      .map((prop: any) => {
        const words = nepaliWords204?.filter((word: any) => {
          return word?.nepali?.includes(prop?.nepali);
        });

        return {
          ...prop,
          words,
        };
      })
      .filter((prop: any) => {
        if (filterZeroes) {
          return (
            prop?.nepali &&
            nepaliWords204?.filter((word: any) => {
              return word?.nepali?.includes(prop?.nepali);
            })?.length &&
            prop?.words?.length > WORD_LEN
          );
        }
        return prop?.nepali;
      });

    if (sortByPopularity) {
      return [...res].sort((a, b) => b?.words?.length - a?.words?.length);
    }
    return res;
  }, [cc, nepaliWords204, filterZeroes, sortByPopularity]);

  const ccV3Data = useMemo(() => {
    const res = ccV3
      .map((prop: any) => {
        const words = nepaliWords204?.filter((word: any) => {
          return word?.nepali?.includes(prop?.nepali);
        });

        return {
          ...prop,
          words,
        };
      })
      .filter((prop: any) => {
        if (filterZeroes) {
          return (
            prop?.nepali &&
            nepaliWords204?.filter((word: any) => {
              return word?.nepali?.includes(prop?.nepali);
            })?.length &&
            prop?.words?.length > WORD_LEN
          );
        }
        return prop?.nepali;
      });

    if (sortByPopularity) {
      return [...res].sort((a, b) => b?.words?.length - a?.words?.length);
    }
    return res;
  }, [ccV3, nepaliWords204, filterZeroes, sortByPopularity]);

  switch (view) {
    case "devanagari":
      return (
        <>
          <div className="mx-4 md:mx-16 flex justify-between items-center">
            <div>
              <button
                className={`px-4 ${
                  isHidden ? "dark:white" : "dark:text-gray-500"
                } transition hover:text-white font-extralight`}
                onClick={() => {
                  toggleTranslation((hidden) => !hidden);
                }}
              >
                {isHidden ? "show" : "hide"}
              </button>
              <button
                className={`px-4 ${
                  isCoreOnly ? "dark:white" : "dark:text-gray-500"
                } transition hover:text-white font-extralight`}
                onClick={() => {
                  toggleCore((hidden) => !hidden);
                }}
              >
                {"core"}
              </button>
            </div>
            <div className="px-8 text-black dark:text-white flex flex-wrap items-center justify-center">
              {[
                ...(new Set(nepaliConsonants.map((i) => i.variant)) as any),
              ].map((variant: any) => {
                return (
                  <button
                    key={JSON.stringify(variant)}
                    onClick={() => {
                      setVariants((prev: any) => {
                        return prev?.includes(variant)
                          ? prev?.filter((item: any) => item !== variant)
                          : prev?.concat(variant);
                      });
                    }}
                    className={`${
                      variants?.includes(variant)
                        ? "dark:text-white text-gray-700"
                        : "dark:text-gray-400 text-gray-200"
                    } dark:hover:text-white px-6 py-2 transition font-extralight`}
                  >
                    {variant}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mx-4 my-4 md:mx-16 lex flex-wrap items-center justify-center">
            {nepaliConsonants.map((prop) => {
              // return <p className='p-4'>{prop?.hanzi}</p>
              const words = nepaliWords204?.filter((word: any) => {
                return word?.nepali?.split("")?.includes(prop?.nepali);
              });
              const words2 = nepaliWords204?.filter((word: any) => {
                return word?.nepali?.includes(prop?.nepali);
              });

              const words3 = words?.length ? words : words2;

              // if (isCoreOnly) {
              //   if (words3?.length < 20) {
              //     return null
              //   }
              // }
              return (
                <button
                  key={JSON.stringify(prop)}
                  onClick={() => {
                    setSelectedId(prop.nepali);
                  }}
                  className={`${
                    variants.includes(prop?.variant) ||
                    (isCoreOnly && words3?.length >= 20)
                      ? "dark:text-white text-gray-700"
                      : "dark:text-gray-500 text-gray-200"
                  } dark:hover:text-white p-6`}
                >
                  <span
                    className={`block text-[10px] ${
                      variants.includes(prop?.variant)
                        ? "dark:text-white"
                        : "dark:text-slate-600"
                    }`}
                  >
                    {" "}
                    {words3?.length}
                  </span>
                  {isHidden ? null : (
                    <span
                      className={`block text-[10px] ${
                        variants.includes(prop?.variant)
                          ? "dark:text-white"
                          : "dark:text-slate-600"
                      }`}
                    >
                      {prop?.variant}
                    </span>
                  )}
                  <span className="text-4xl"> {prop.nepali}</span>
                  {isHidden ? null : (
                    <span className="block text-[12px]"> {prop.en}</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
            {nepaliVowels.map((prop) => {
              const words = nepaliWords204?.filter((word: any) => {
                return word?.nepali?.split("")?.includes(prop?.nepali);
              });
              const words2 = nepaliWords204?.filter((word: any) => {
                return word?.nepali?.includes(prop?.nepali);
              });

              const words3 = words?.length ? words : words2;

              // if (isCoreOnly) {
              //   if (words3?.length < 10) {
              //     return null
              //   }
              // }

              return (
                <button
                  key={JSON.stringify(prop)}
                  onClick={() => {
                    setSelectedId(prop.nepali);
                  }}
                  className={`${"dark:text-gray-500 text-gray-200"} dark:hover:text-white p-6 transition`}
                >
                  <span className="dark:text-gray-600 block text-[10px]">
                    {" "}
                    {words3?.length}
                  </span>
                  <span className="text-4xl"> {prop.nepali}</span>

                  {isHidden ? null : (
                    <span className="block text-[12px]"> {prop.en}</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mx-4 md:mx-16 text-black dark:text-white flex flex-wrap items-start justify-center">
            {uniqueWords.map((prop: any) => {
              // return <p className='p-4'>{prop?.hanzi}</p>

              const words = nepaliWords204?.filter((word: any) => {
                // return word?.nepali?.split('')?.includes(prop?.nepali)
                return word?.nepali?.includes(prop?.nepali);
              });

              return (
                <button
                  key={JSON.stringify(prop)}
                  onClick={() => {
                    setSelectedId(prop.nepali);
                  }}
                  className={`${"dark:text-gray-500 text-gray-200"} dark:hover:text-white p-6 transition flex items-center flex-col grow`}
                >
                  <span className="dark:text-gray-600 block text-[10px] mb-2">
                    {" "}
                    {words?.length}
                  </span>
                  <span className="block text-4xl"> {prop.nepali}</span>

                  {isHidden ? null : (
                    <span className="block text-[12px] my-2"> {prop.en}</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      );
    case "words":
      return (
        <>
          <div className="mx-4 md:mx-16 flex justify-between items-center">
            <div className="px-8 text-black dark:text-white flex flex-wrap items-center justify-start">
              {["consonants", "vowels", "consonants only"].map(
                (variant: any) => {
                  return (
                    <button
                      key={JSON.stringify(variant)}
                      onClick={() => {
                        setFilterType(variant);
                      }}
                      className={`${
                        filterType === variant
                          ? "dark:text-white text-gray-700"
                          : "dark:text-gray-400 text-gray-200"
                      } dark:hover:text-white px-6 py-2 transition font-extralight`}
                    >
                      {variant}
                    </button>
                  );
                }
              )}
            </div>
          </div>
          {filterType === "consonants" ? (
            <div className="mx-4 md:mx-16 flex justify-between items-center">
              <div className="px-8 text-black dark:text-white flex flex-wrap items-center justify-start">
                {nepaliConsonants.map((variant: any) => {
                  return (
                    <button
                      key={JSON.stringify(variant)}
                      onClick={() => {
                        setFilterCharacter(variant?.nepali);
                      }}
                      className={`${
                        variant?.nepali === filterCharacter
                          ? "dark:text-white text-gray-700"
                          : "dark:text-gray-400 text-gray-200"
                      } dark:hover:text-white px-6 py-2 transition font-extralight`}
                    >
                      {variant?.nepali}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
          {filterType === "vowels" ? (
            <>
              <div className="mx-4 md:mx-16 flex justify-between items-center">
                <div className="px-8 text-black dark:text-white flex flex-wrap items-center justify-start">
                  {nepaliVowels.map((variant: any) => {
                    return (
                      <button
                        key={JSON.stringify(variant)}
                        onClick={() => {
                          setFilterCharacter(variant?.nepali);
                        }}
                        className={`${
                          variant?.nepali === filterCharacter
                            ? "dark:text-white text-gray-700"
                            : "dark:text-gray-400 text-gray-200"
                        } dark:hover:text-white px-6 py-2 transition font-extralight`}
                      >
                        {variant?.nepali}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mx-4 md:mx-16 flex justify-between items-center">
                <div className="px-8 text-black dark:text-white flex flex-wrap items-center justify-start">
                  {dependentVowels.map((variant: any) => {
                    return (
                      <button
                        key={JSON.stringify(variant)}
                        onClick={() => {
                          setFilterCharacter(variant?.nepali);
                        }}
                        className={`${
                          variant?.nepali === filterCharacter
                            ? "dark:text-white text-gray-700"
                            : "dark:text-gray-400 text-gray-200"
                        } dark:hover:text-white px-6 py-2 transition font-extralight`}
                      >
                        {variant?.nepali}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : null}
          <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
            {nepaliWords204.map((prop: any) => {
              return (
                <button
                  key={JSON.stringify(prop)}
                  onClick={() => {
                    setSelectedId(prop.nepali);
                  }}
                  className={`${
                    true
                      ? "dark:text-white text-gray-700"
                      : "dark:text-gray-500 text-gray-200"
                  } dark:hover:text-white p-6 transition`}
                >
                  <span className="text-4xl"> {prop.nepali}</span>
                  <span className="block text-[12px] py-2"> {prop.en}</span>
                  <span className="block p-0 m-0 text-[12px]">
                    {" "}
                    {prop?.nepaliRoman}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      );
    case "cc":
      return (
        <>
          <div className="mx-4 md:mx-16 flex justify-between items-center">
            <div>
              <button
                onClick={() => {
                  toggleFilterZeroes((tog) => !tog);
                }}
                className={`px-4 ${
                  filterZeroes ? "dark:white" : "dark:text-gray-500"
                } transition hover:text-white font-extralight`}
              >
                {filterZeroes ? "show all" : "show used"} (
                {viewMode === "halant" ? ccHal?.length : ccV3Data?.length})
              </button>
              <button
                onClick={() => {
                  toggleSortPopularity((tog) => !tog);
                }}
                className={`px-4 ${
                  sortByPopularity ? "dark:white" : "dark:text-gray-500"
                } transition hover:text-white font-extralight`}
              >
                {sortByPopularity
                  ? "sort by consonant order"
                  : "sort by popularity"}
              </button>
            </div>
            <div className="px-8 text-black dark:text-white flex flex-wrap items-center justify-center">
              {["halant", "consonant + dependent verb"].map((variant: any) => {
                return (
                  <button
                    key={JSON.stringify(variant)}
                    onClick={() => {
                      setViewMode(variant);
                    }}
                    className={`${
                      viewMode === variant
                        ? "dark:text-white text-gray-700"
                        : "dark:text-gray-400 text-gray-200"
                    } dark:hover:text-white px-6 py-2 transition font-extralight`}
                  >
                    {variant}
                  </button>
                );
              })}
            </div>
          </div>

          {viewMode === "halant" ? (
            <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
              {ccHal.map((prop: any) => {
                return (
                  <button
                    key={JSON.stringify(prop)}
                    onClick={() => {
                      setSelectedId(prop.nepali);
                    }}
                    className={`${
                      true
                        ? // prop?.words?.length > 10
                          "dark:text-white text-gray-700"
                        : "dark:text-gray-500 text-gray-200"
                    } dark:hover:text-white p-6 transition`}
                  >
                    <span
                      className={`block text-[10px] ${
                        variants.includes(prop?.variant)
                          ? "dark:text-white"
                          : "dark:text-slate-600"
                      }`}
                    >
                      {" "}
                      {/* {words3?.length} */}
                      {prop?.words?.length}
                    </span>
                    <span
                      className={`block text-[10px] ${
                        variants.includes(prop?.variant)
                          ? "dark:text-white"
                          : "dark:text-slate-600"
                      }`}
                    >
                      {prop?.nepali?.split("")[0]} {prop?.nepali?.split("")[2]}{" "}
                    </span>

                    <span className="text-4xl"> {prop.nepali}</span>
                    {prop?.en ? (
                      <span className="block text-[12px] py-2"> {prop.en}</span>
                    ) : null}
                    <span className="block p-0 m-0 text-[12px]">
                      {" "}
                      {prop?.nepaliRoman}
                    </span>
                    {/* <span className='space-x-2 flex items-center p-0 m-0 text-[12px]'>
                    <span>
                      {prop?.nepali?.split('')[0]} {prop?.nepali?.split('')[2]}{' '}
                    </span>
                    <span>{prop?.words?.length}</span>
                  </span> */}
                  </button>
                );
              })}
            </div>
          ) : null}

          {viewMode === "consonant + dependent verb" ? (
            <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
              {ccV3Data.map((prop: any) => {
                return (
                  <button
                    key={JSON.stringify(prop)}
                    onClick={() => {
                      setSelectedId(prop.nepali);
                    }}
                    className={`${
                      true
                        ? // prop?.words?.length > 10
                          "dark:text-white text-gray-700"
                        : "dark:text-gray-500 text-gray-200"
                    } dark:hover:text-white p-6 transition`}
                  >
                    <span
                      className={`block text-[10px] ${
                        variants.includes(prop?.variant)
                          ? "dark:text-white"
                          : "dark:text-slate-600"
                      }`}
                    >
                      {" "}
                      {/* {words3?.length} */}
                      {prop?.words?.length}
                    </span>
                    <span
                      className={`block text-[10px] ${
                        variants.includes(prop?.variant)
                          ? "dark:text-white"
                          : "dark:text-slate-600"
                      }`}
                    >
                      {prop?.nepali?.split("")[0]} {prop?.nepali?.split("")[2]}{" "}
                    </span>

                    <span className="text-4xl"> {prop.nepali}</span>
                    {prop?.en ? (
                      <span className="block text-[12px] py-2"> {prop.en}</span>
                    ) : null}
                    <span className="block p-0 m-0 text-[12px]">
                      {" "}
                      {prop?.nepaliRoman}
                    </span>
                    {/* <span className='space-x-2 flex items-center p-0 m-0 text-[12px]'>
                    <span>
                      {prop?.nepali?.split('')[0]} {prop?.nepali?.split('')[2]}{' '}
                    </span>
                    <span>{prop?.words?.length}</span>
                  </span> */}
                  </button>
                );
              })}
            </div>
          ) : null}
          {/* <div className='mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center'>
            {ccB.map((prop: any) => {
              return (
                <button
                  onClick={() => {
                    setSelectedId(prop.nepali)
                  }}
                  className={`${
                    learnedWords.includes(prop?.nepali)
                      ? // prop?.words?.length > 10
                        'dark:text-white text-gray-700'
                      : 'dark:text-gray-500 text-gray-200'
                  } dark:hover:text-white p-6 transition`}
                >
                  <span
                    className={`block text-[10px] ${
                      variants.includes(prop?.variant)
                        ? 'dark:text-white'
                        : 'dark:text-slate-600'
                    }`}
                  >
                    {prop?.words?.length}
                  </span>
                  <span
                    className={`block text-[10px] ${
                      variants.includes(prop?.variant)
                        ? 'dark:text-white'
                        : 'dark:text-slate-600'
                    }`}
                  >
                    {prop?.nepali?.split('')[0]} {prop?.nepali?.split('')[2]}{' '}
                  </span>

                  <span className='text-4xl'> {prop.nepali}</span>
                  {prop?.en ? (
                    <span className='block text-[12px] py-2'> {prop.en}</span>
                  ) : null}
                  <span className='block p-0 m-0 text-[12px]'>
                    {' '}
                    {prop?.nepaliRoman}
                  </span>
                </button>
              )
            })}
          </div> */}
        </>
      );
    case "sentences":
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
          {nepaliSentences.map((prop) => {
            return (
              <button
                key={JSON.stringify(prop)}
                onClick={() => {
                  setSelectedId(prop);
                }}
                className={`p-6 text-4xl transition`}
              >
                {prop?.split("").map((h) => {
                  return (
                    <span
                      key={JSON.stringify(h)}
                      onClick={() => {
                        setSelectedId(h);
                      }}
                      className={`${
                        // learnedWords.includes(h)
                        "dark:text-gray-500 text-gray-200"
                      } dark:hover:text-white text-4xl transition`}
                    >
                      {h}
                    </span>
                  );
                })}
                {/* {prop.hanzi} */}
              </button>
            );
          })}
        </div>
      );

    default:
      return null;
  }
};

const calculateColor = (dict: any) => {
  switch (dict?.tone) {
    case 1:
      return "text-red-400";
    case 2:
      return "text-green-400";
    case 3:
      return "text-sky-400";
    case 4:
      return "text-purple-400";
    default:
      return "text-black dark:text-white";
  }
};

// function ComponentEditor({ selectedId, setSelectedId }: any) {
//   const nepaliWords204 = useWordsStore((s) => s?.words);

//   const dict =
//     dictionary?.[selectedId] ||
//     commonChinesePhrases?.find((phrase) => phrase?.hanzi === selectedId) ||
//     nepaliWords?.find((word: any) => word?.nepali === selectedId) ||
//     nepaliWords204?.find((word: any) => word?.nepali === selectedId) ||
//     cc?.find((word: any) => word?.nepali === selectedId);

//   const lessonHistories = useLessonHistoryStore((state: any) => state.history);

//   const speakHistory = useMemo(() => {
//     return lessonHistories.filter((history: any) => {
//       return history?.answer?.[0]?.transcript?.includes(selectedId);
//     });
//   }, [lessonHistories]);

//   const relatedWords1 = nepaliWords204.filter((word: any) => {
//     return word?.nepali?.split("")?.includes(selectedId);
//   });

//   const words2 = nepaliWords204?.filter((word: any) => {
//     return word?.nepali?.includes(selectedId);
//   });

//   const relatedWords = useMemo(() => {
//     return (relatedWords1?.length ? relatedWords1 : words2)?.sort(
//       (a: any, b: any) => {
//         return a?.nepali?.split("")?.length - b?.nepali?.split("")?.length;
//       }
//     );
//   }, [relatedWords1, words2]);

//   const actor = learnedActors.find((actor) => actor.id === selectedId);
//   return (
//     <div>
//       <div className="my-4 mx-8 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-between">
//         <div></div>
//         <div className="space-x-2 flex flex-col items-center">
//           {dict?.nepali ? (
//             <>
//               <span
//                 className={`items-center flex space-x-4 text-2xl font-bold ${calculateColor(
//                   dict
//                 )}`}
//               >
//                 {" "}
//                 <span>{dict?.sound ? <Music url={dict?.sound} /> : null} </span>
//                 <span> {dict?.nepali} </span>
//                 {dict?.en ? (
//                   <>
//                     <span>| </span>
//                     <span className={`text-2xl dark:text-gray-400 font-light`}>
//                       {dict?.en}
//                     </span>
//                   </>
//                 ) : null}
//                 {dict?.nepaliRoman ? (
//                   <>
//                     <span>| </span>
//                     <span className={`text-2xl dark:text-gray-400 font-light`}>
//                       {dict?.nepaliRoman}
//                     </span>
//                   </>
//                 ) : null}
//               </span>

//               {dict?.type ? (
//                 <div className="dark:text-slate-400 flex items-center flex-row space-x-4">
//                   <span className="dark:text-slate-400 text-[12px]">
//                     {dict?.type}
//                   </span>
//                   <span className="dark:text-slate-400 text-[12px]">|</span>
//                   <span className="dark:text-slate-400 text-[12px]">
//                     {dict?.variant}
//                   </span>
//                 </div>
//               ) : null}

//               <div className="flex space-x-4 items-center">
//                 {// nepaliWords
//                 selectedId
//                   ?.split("")
//                   .map((item: any) => {
//                     const word = nepaliWords?.find(
//                       (word: any) => word?.nepali === item
//                     );
//                     return word;
//                   })
//                   .filter(
//                     (word: any) =>
//                       selectedId?.includes(word?.nepali) &&
//                       selectedId !== word?.nepali
//                   )
//                   .map((word: any) => {
//                     const selectedIdArr = selectedId
//                       ?.split(" ")
//                       ?.join("")
//                       ?.split("");
//                     const index = selectedIdArr.indexOf(word?.nepali);
//                     return {
//                       ...word,
//                       index,
//                     };
//                   })
//                   // .sort((a: any, b: any) => a.index - b.index)
//                   .map((word: any, idx: any) => {
//                     return (
//                       <div
//                         key={`${word?.nepali}-${idx}`}
//                         className="text-2xl p-4 flex flex-col justify-center items-center font-extralight"
//                       >
//                         <div className="dark:text-slate-400 flex items-center flex-row space-x-4">
//                           <span className="text-[12px] dark:text-gray-400">
//                             {word?.nepaliRoman || word?.en || "n/a"}
//                           </span>
//                         </div>
//                         <span
//                           onClick={() => {
//                             setSelectedId(word?.nepali);
//                           }}
//                         >
//                           {word?.nepali}
//                         </span>

//                         {/* <div className='dark:text-slate-400 flex items-center flex-row space-x-4'>
//                           <span className='dark:text-slate-400 text-[12px]'>
//                             {word?.type}
//                           </span>
//                           <span className='dark:text-slate-400 text-[12px]'>
//                             |
//                           </span>
//                           <span className='dark:text-slate-400 text-[12px]'>
//                             {word?.variant}
//                           </span>
//                         </div> */}
//                       </div>
//                     );
//                   })}
//               </div>
//             </>
//           ) : (
//             <span className={`items-center flex flex-col`}>
//               <span className={`text-3xl font-bold ${calculateColor(dict)}`}>
//                 {selectedId}
//               </span>

//               <div className="flex space-x-4 items-center">
//                 {// nepaliWords
//                 selectedId
//                   ?.split("")
//                   .map((item: any) => {
//                     const word = nepaliWords?.find(
//                       (word: any) => word?.nepali === item
//                     );
//                     return word;
//                   })
//                   .filter(
//                     (word: any) =>
//                       selectedId?.includes(word?.nepali) &&
//                       selectedId !== word?.nepali
//                   )
//                   .map((word: any) => {
//                     const selectedIdArr = selectedId
//                       ?.split(" ")
//                       ?.join("")
//                       ?.split("");
//                     const index = selectedIdArr.indexOf(word?.nepali);
//                     return {
//                       ...word,
//                       index,
//                     };
//                   })
//                   // .sort((a: any, b: any) => a.index - b.index)
//                   .map((word: any, idx: any) => {
//                     return (
//                       <div
//                         key={`${word?.nepali}-${idx}`}
//                         className="text-2xl p-4 flex flex-col justify-center items-center font-extralight"
//                       >
//                         <div className="dark:text-slate-400 flex items-center flex-row space-x-4">
//                           <span className="text-[12px] dark:text-gray-400">
//                             {word?.nepaliRoman || word?.en || "n/a"}
//                           </span>
//                         </div>
//                         <span
//                           onClick={() => {
//                             setSelectedId(word?.nepali);
//                           }}
//                         >
//                           {word?.nepali}
//                         </span>

//                         {/* <div className='dark:text-slate-400 flex items-center flex-row space-x-4'>
//                           <span className='dark:text-slate-400 text-[12px]'>
//                             {word?.type}
//                           </span>
//                           <span className='dark:text-slate-400 text-[12px]'>
//                             |
//                           </span>
//                           <span className='dark:text-slate-400 text-[12px]'>
//                             {word?.variant}
//                           </span>
//                         </div> */}
//                       </div>
//                     );
//                   })}
//               </div>
//             </span>
//           )}
//         </div>

//         <button
//           onClick={() => {
//             setSelectedId(null);
//           }}
//           className={`my-4 flex flex-col items-center dark:text-gray-800 hover:dark:text-white transition`}
//         >
//           <CloseIcon className="text-4xl" />
//         </button>
//       </div>

//       <div className="mx-8 md:mx-16">
//         <p className="text-center font-extralight dark:text-gray-400">
//           {" "}
//           {dict?.description}
//         </p>
//       </div>
//       {dict?.type === "dependent vowel" ? (
//         <div className="mx-8 md:mx-16 my-4">
//           {/* {nepaliConsonants?.map(consonant => {

//           })} */}

//           <div className="flex flex-wrap">
//             {nepaliConsonants.map((word: any) => {
//               return (
//                 <div
//                   onClick={() => {
//                     setSelectedId(`${word?.nepali}${dict?.nepali}`);
//                   }}
//                   className="flex flex-col items-center justify-center p-4 font-extralight"
//                 >
//                   <span className="dark:text-slate-300 text-2xl">
//                     {`${word?.nepali}${dict?.nepali}`}
//                   </span>
//                   {/* <span className='dark:text-slate-400'>{word?.en}</span> */}
//                   <span className="dark:text-slate-400">
//                     {dict?.nepali === "्"
//                       ? `${word?.nepaliRoman?.slice(0, -1)}`
//                       : `${word?.nepaliRoman?.slice(0, -1)}${dict.nepaliRoman}`}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ) : null}
//       <div className="my-4 mx-8 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-between">
//         <div></div>
//         <div className="space-x-2 flex flex-col items-center">
//           {dict?.nepali ? (
//             <>
//               <div className="flex flex-wrap">
//                 {relatedWords.map((word: any) => {
//                   return (
//                     <div
//                       onClick={() => {
//                         setSelectedId(word?.nepali);
//                       }}
//                       className="flex flex-col items-center justify-center p-4 font-extralight"
//                     >
//                       <span className="dark:text-slate-300 text-2xl">
//                         {word?.nepali}
//                       </span>
//                       <span className="dark:text-slate-400">{word?.en}</span>
//                       <span className="dark:text-slate-400">
//                         {word?.nepaliRoman}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           ) : (
//             <span className={`items-center flex flex-col`}>
//               <span className={`text-3xl font-bold ${calculateColor(dict)}`}>
//                 {selectedId}
//               </span>

//               <>
//                 <div className="flex flex-wrap">
//                   {relatedWords.map((word: any) => {
//                     return (
//                       <div
//                         onClick={() => {
//                           setSelectedId(word?.nepali);
//                         }}
//                         className="flex flex-col items-center justify-center p-4 font-extralight"
//                       >
//                         <span className="dark:text-slate-300 text-2xl">
//                           {word?.nepali}
//                         </span>
//                         <span className="dark:text-slate-400">{word?.en}</span>
//                         <span className="dark:text-slate-400">
//                           {word?.nepaliRoman}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>

//               {/* <div>
//                 <code>
//                   <pre>
//                     {JSON.stringify(
//                       nepaliWords.filter((word: any) =>
//                         selectedId?.includes(word?.nepali)
//                       ),
//                       null,
//                       2
//                     )}
//                   </pre>
//                 </code>
//               </div> */}
//             </span>
//           )}
//         </div>

//         <div></div>
//       </div>
//     </div>
//   );
// }

export function Devanagari() {
  const [selectedId, setSelectedId] = useState<any>("");
  // const [view, setView] = useState('devanagari')
  const [view, setView] = useState("cc");
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((seconds) => seconds + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grow">
      <div className="dark:text-gray-500 my-4 space-x-8 flex justify-center items-center">
        <button
          onClick={() => {
            setSelectedId(null);
            setView("play");
          }}
          className={`${
            view === "play" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <PlayIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Play</p>
        </button>

        <button
          onClick={() => {
            setSelectedId(null);
            setView("devanagari");
          }}
          className={`${
            view === "devanagari" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <PinyinChartIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">devanagari</p>
        </button>
        <button
          onClick={() => {
            setSelectedId(null);
            setView("cc");
          }}
          className={`${
            view === "cc" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <CCIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">cc</p>
        </button>
        <button
          onClick={() => {
            setSelectedId(null);
            setView("words");
          }}
          className={`${
            view === "words" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <WordIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">śabda</p>
        </button>
        <button
          onClick={() => {
            setSelectedId(null);
            setView("sentences");
          }}
          className={`${
            view === "sentences" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <SentenceIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">vākya</p>
        </button>
        <button
          onClick={() => {
            setSelectedId(null);
            setView("new");
          }}
          className={`${
            view === "new" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <PlusIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Add</p>
        </button>
      </div>

      <PageView setSelectedId={setSelectedId} view={view} />

      {/* {selectedId ? (
        <ComponentEditor
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ) : (
        <PageView setSelectedId={setSelectedId} view={view} />
      )} */}
    </div>
  );
}
