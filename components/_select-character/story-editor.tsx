"use client";

import React from "react";

import { Icons } from "../ui/icons.v2";

import { Editor } from "../Editor";
import { useStoryStore } from "./story-store";
import { useUpdateCharacterStoryMutation } from "@/domain/lesson/character.mutations";

export const StoryEditor = ({
  selectedChar,
  story: initStory,
  disableSave,
}: any) => {
  const story = useStoryStore((state: any) => state.story);

  const setStory = useStoryStore((state: any) => state.setStory);

  const updateStoryMutation = useUpdateCharacterStoryMutation();

  const storyId = crypto.randomUUID();

  return (
    <div className="my-16 text-black dark:text-white justify-start w-full md:9/12 lg:w-7/12">
      <Editor
        readOnly={false}
        content={initStory || story}
        onUpdate={(val: any) => {
          setStory(val);
        }}
      />

      {/* {!disableSave && story && story !== selectedChar?.story && ( */}
      {!disableSave && story && story !== selectedChar?.story && (
        <button
          className="my-12"
          onClick={() => {
            return updateStoryMutation
              .mutateAsync({
                id: selectedChar?.id,
                story: story,
              })
              .then(() => {
                console.log("Story Successfully Updated");
              });
          }}
        >
          {updateStoryMutation.isLoading ? (
            <Icons.spinner spinPulse />
          ) : false ? (
            <Icons.checkCircle className="transition" />
          ) : (
            "Save"
          )}
        </button>
      )}
    </div>
  );
};
