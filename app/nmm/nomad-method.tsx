import { useMemo, useState } from "react";

import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";
import { useListComponents } from "@/domain/lesson/component.queries";
import { initCharacter, useCharacterStore } from "./nomad-method-store";

import { useAddStepsMutation } from "@/domain/lesson/step.mutations";

import { ComponentReview } from "./component-review";
import { LessonAddSuccessView } from "./lesson-add-success-view";
import { LottieLoadingAnimation } from "./lottie-loading-animation";
import { NoLessonView } from "./no-lesson-view";

export function NomadMethod({
  selectedId,
  onClose,
}: {
  selectedId: string;
  onClose?: any;
}) {
  // const [lessonIndex, setLessonIndex] = useState(0);

  const [showYay, setShowYay] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const [viewSucessBanner, setViewSuccessBanner] = useState(false);

  const addCharacterMutation = useAddCharacterMutation();

  const characterState = useCharacterStore(
    (state: any) => state.character
  ) as any;
  const setCharacterState = useCharacterStore(
    (state: any) => state.setCharacter
  ) as any;

  const [lessonIndex, setLessonIndex] = useState(0);

  const { data: components, isLoading, isFetching } = useListComponents();

  const firstLesson = useMemo(
    () => components?.find((component: any) => component?.hanzi === selectedId),
    [components, selectedId]
  );

  const addStepsMutation = useAddStepsMutation({
    onSuccess: () => {
      setViewSuccessBanner(true);
    },
  });

  // Current Lesson
  const lesson = useMemo(
    () => firstLesson?.steps?.[lessonIndex],
    [firstLesson, lessonIndex]
  );

  const reset = () => {
    // setAnswers({});
    setCharacterState(initCharacter);

    setLessonIndex(0);
  };

  if (viewSucessBanner) {
    return (
      <LessonAddSuccessView
        showYay={showYay}
        setShowMsg={setShowMsg}
        setShowYay={setShowYay}
        showMsg={showMsg}
        lesson={lesson}
        selectedId={selectedId}
        setViewSuccessBanner={setViewSuccessBanner}
      />
    );
  }

  if (addStepsMutation.isPending || isFetching) {
    // load lottile files here
    return <LottieLoadingAnimation />;
  }

  if (
    !firstLesson?.steps?.length ||
    !firstLesson?.steps?.filter((step: any) => Boolean(step?.hanzi))?.length
  ) {
    return (
      <NoLessonView
        onClose={onClose}
        selectedId={selectedId}
        lesson={lesson}
        addStepsMutation={addStepsMutation}
        firstLesson={firstLesson}
        setShowYay={setShowYay}
        setViewSuccessBanner={setViewSuccessBanner}
      />
    );
  }

  if (!lesson && characterState?.story) {
    return (
      <ComponentReview
        characterState={characterState}
        addCharacterMutation={addCharacterMutation}
        firstLesson={firstLesson}
        reset={reset}
        lessonIndex={lessonIndex}
        setLessonIndex={setLessonIndex}
      />
    );
  }
}
