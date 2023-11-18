import { useCallback, useMemo, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./loading_animation.json";

import yay from "./yay.json";

import { useViewModeStore } from "./use-view-mode-store";
import { initCharacter, useCharacterStore } from "./nomad-method-store";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useAddAnswerMutation } from "@/domain/lesson/answer.mutations";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useListSubComponentsQuery } from "@/domain/component/component.queries";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faXmark,
} from "@fortawesome/pro-thin-svg-icons";
import { useAddStepsMutation } from "@/domain/lesson/step.mutations";
import { ComponentForm } from "./component-form";
import { LessonAddSuccessView } from "./lesson-add-success-view";
import { Editor } from "@/components/Editor";

export const ComponentReview = ({
  characterState,
  addCharacterMutation,
  firstLesson,
  reset,
}: any) => {
  return (
    <div className="relative mt-32 grow flex flex-col items-center">
      <p className="my-2 text-black dark:text-white text-3xl font-extrabold">
        Review
      </p>

      <p className="dark:text-gray-400">
        Lets quickly review before submitting
      </p>

      <div className="mt-16 mx-8 md:mx-72 text-center space-y-2">
        <p className="text-gray-300">
          <a
            role="a"
            href={`https://www.youtube.com/results?search_query=${characterState?.nomad}`}
            target="_blank"
          >
            {characterState?.nomad} @{" "}
          </a>
          <span className="font-bold">
            {characterState?.destination}, {characterState?.location}
          </span>
        </p>

        <div className="pt-4 pb-16 text-gray-300 text-lg font-light">
          {/* {characterState.story} */}
          <Editor id="story" content={characterState.story} />
        </div>
      </div>

      {/* <div className="my-8 py-8 w-full items-center justify-center flex space-x-8 md:space-x-16">
        <code>
          <pre>{JSON.stringify(characterState, null, 2)}</pre>
        </code>
      </div> */}

      <div className="bottom-0 py-4">
        <button
          onClick={() => {
            addCharacterMutation
              ?.mutateAsync({
                hanzi: firstLesson?.hanzi,
                pinyin: firstLesson?.pinyin,
                en: firstLesson?.en,
                level: firstLesson?.level,
                nomad: characterState?.nomad,
                destination: characterState?.destination,
                location: characterState?.location,
                journeyId: firstLesson.id,
                // todo | completed
                status: "completed",
                story: characterState?.story,
                component: characterState?.component,
                sub_components: [],
              })
              .then(() => {
                reset();
              });
          }}
          className="hover:shadow-blue-600 shadow-md py-2 px-8 rounded bg-gray-800 text-md font-extralight"
        >
          Complete
        </button>
      </div>
    </div>
  );
};
