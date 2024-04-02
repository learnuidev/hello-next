"use client";
import { Pronounciation } from "./Pronounciation";

import { useCurrentLesson } from "./useCurrentLesson";

import { useSpeakStore } from "./useSpeakStore";
import { useViewModeStore } from "../convos/useViewModeStore";
import { NewSpeak } from "../convos/NewSpeak";
import Link from "next/link";

export const SpeakPage = () => {
  const lessonId = useCurrentLesson((state: any) => state.lessonId);
  const setLesson = useCurrentLesson((state: any) => state.setCurrentLesson);
  const viewMode = useViewModeStore((state: any) => state.viewMode);
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const lessons = useSpeakStore((state) => state.lessons);

  if (viewMode === "speak/add") {
    return <NewSpeak type="speak" />;
  }

  return lessonId ? (
    <Pronounciation lessonId={lessonId} />
  ) : (
    <>
      <div className="md:mx-32 my-16 flex flex-wrap">
        {lessons?.map((convo: any) => {
          return (
            <Link
              href={`/speak/${convo?.id}`}
              key={convo?.title}
              className="text-left m-8 mx-16 text-lg md:text-2xl font-extralight dark:text-gray-400 dark:hover:text-white transition"
            >
              {convo?.title}
            </Link>
          );
        })}
      </div>
    </>
  );
};
