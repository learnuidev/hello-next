// import Image from 'next/image'
"use client";

import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import Markdown from "react-markdown";

import { faLightbulb } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";
import Link from "next/link";
import { Editor } from "../Editor";

export function Summary({
  characterId,
  showMeanings,
}: {
  characterId: string;
  showMeanings: boolean;
}) {
  const currentDecodedCharacter = decodeURIComponent(characterId);

  const { data: meaning, isLoading } = useListMeaningsQuery({
    content: currentDecodedCharacter,
  });

  const meaningResponse = meaning as ListMeaningsResponse;

  if (isLoading) {
    return null;
  }
  return (
    <main className="">
      <div className="">
        {/* <div className="flex justify-between items-center w-full my-4 md:my-8">
          <h1 className="text-4xl">{currentDecodedCharacter}</h1>
        </div> */}

        <div className="my-16">
          {/* <h3 className="sm:text-xl my-4 space-x-2">
            <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
            <span>Summary</span>
          </h3> */}
          {/* <p className="font-light w-full sm:w-8/12">
            {meaningResponse?.summary}
          </p> */}

          <Editor readOnly={true} content={meaningResponse?.summary || ""} />

          {/* <Markdown>{meaningResponse?.summary}</Markdown> */}
        </div>
        {/* {showMeanings && (
          <div className="mt-16">
            <h3 className="sm:text-xl my-8 space-x-2">
              <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
              <span>Meanings</span>
            </h3>

            <div className="space-y-8">
              {meaningResponse?.meanings?.map((meaning) => {
                return (
                  <div key={meaning.meaning}>
                    <h4 className="font-bold">{meaning.meaning}</h4>

                    <p className="text-gray-300 font-light">
                      {meaning.explanation}
                    </p>

                    <div className="w-full space-y-4 mt-2">
                      {meaning.use_cases?.map((useCase) => {
                        return (
                          <div
                            key={useCase.hanzi}
                            className="w-full flex space-x-2"
                          >
                            <Link
                              target="_blank"
                              href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                                useCase.hanzi
                              )}`}
                            >
                              {useCase.hanzi}
                            </Link>
                            <p className="text-gray-300">{useCase.pinyin}</p>
                            <p className="text-gray-400">{useCase.en}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )} */}
      </div>

      {/* <div>
        <pre>
          <code>{JSON.stringify(meaning, null, 2)}</code>
        </pre>
      </div> */}
    </main>
  );
}
