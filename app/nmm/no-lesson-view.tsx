import { useCallback, useMemo, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

import yay from "./yay.json";

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

export const NoLessonView = ({
  onClose,
  selectedId,
  lesson,
  addStepsMutation,
  firstLesson,
  setShowYay,
  setViewSuccessBanner,
}: any) => {
  const styles = useSpring({
    from: { opacity: "0" },
    to: { opacity: "1" },
  });

  return (
    <>
      <div className="flex justify-between items-center w-full px-4 md:px-12 md:my-2">
        {onClose ? (
          <button
            className="my-2 dark:text-gray-500 dark:hover:text-gray-300 transition"
            onClick={() => {
              onClose();
            }}
          >
            <FontAwesomeIcon className="text-3xl" icon={faXmark} />
          </button>
        ) : (
          <Link
            className="my-2 dark:text-gray-500 dark:hover:text-gray-300 transition"
            href="/insights"
          >
            <FontAwesomeIcon className="text-3xl" icon={faXmark} />
          </Link>
        )}
      </div>

      <div>
        <animated.div
          className="grid test content-center md:my-48 my-8"
          style={styles}
          key={lesson?.id}
        >
          <div>
            <div className="h-32 mx-4 md:mx-0 grow flex flex-col items-center transition ease-in-out">
              <h1 className="md:mx-48 my-2 mb-8 text-black dark:text-white text-3xl">
                No lesson exists for: {selectedId}
              </h1>
            </div>

            <div className="flex items-center w-full justify-center">
              <button
                disabled={addStepsMutation?.isLoading}
                className={addStepsMutation?.isLoading ? "text-gray-400" : ""}
                onClick={() => {
                  addStepsMutation
                    ?.mutateAsync({
                      componentId: firstLesson?.id,
                    })
                    .then((err: any) => {
                      setShowYay(true);
                      setViewSuccessBanner(true);
                      // alert("Success");
                    })
                    .catch((err: any) => {
                      alert("Err");
                    });
                }}
              >
                {addStepsMutation?.isLoading ? "Creating" : "Create one"}
              </button>
            </div>
          </div>
        </animated.div>
      </div>
    </>
  );
};
