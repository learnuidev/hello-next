"use client";

import React from "react";

import { Icons } from "../ui/icons.v2";

import { Editor } from "../Editor";
import { useStoryStore } from "./story-store";
import { useUpdateCharacterStoryMutation } from "@/domain/lesson/character.mutations";

export const StoryEditor = ({ learnedChar }: any) => {
  const story = useStoryStore((state: any) => state.story);

  const setStory = useStoryStore((state: any) => state.setStory);

  const updateStoryMutation = useUpdateCharacterStoryMutation();

  return (
    <div className="my-16 text-black dark:text-white justify-start w-full md:9/12 lg:w-7/12">
      <Editor
        readOnly={false}
        content={story}
        onUpdate={(val: any) => {
          setStory(val);
        }}
      />

      {story && learnedChar?.story && story !== learnedChar?.story && (
        <button
          className="my-12"
          onClick={() => {
            return updateStoryMutation
              .mutateAsync({
                id: learnedChar?.id,
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
