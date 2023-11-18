import { useMemo, useState } from "react";

import Lottie from "lottie-react";
import groovyWalkAnimation from "./loading_animation.json";

import { initCharacter, useCharacterStore } from "./nomad-method-store";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";

import { useAddStepsMutation } from "@/domain/lesson/step.mutations";
import { ComponentForm } from "./component-form";
import { LessonAddSuccessView } from "./lesson-add-success-view";
import { ComponentReview } from "./component-review";
import { NoLessonView } from "./no-lesson-view";

export function NomadMethod({
  selectedId,
  onClose,
}: {
  selectedId: string;
  onClose?: any;
}) {
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

  const { data: components, isLoading, isFetching } = useListComponentsQuery();

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

  if (addStepsMutation?.isLoading || isFetching) {
    // load lottile files here
    return (
      <div className="content-center my-64">
        <Lottie
          className="h-60"
          // animationData={rocketAnimation}
          animationData={groovyWalkAnimation}
        />
      </div>
    );
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
      />
    );
  }

  return (
    <ComponentForm
      setViewSuccessBanner={setViewSuccessBanner}
      setShowYay={setShowYay}
      selectedId={selectedId}
      onClose={onClose}
    />
  );
}
