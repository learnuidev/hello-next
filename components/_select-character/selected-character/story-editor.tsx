"use client";

import { useEffect, useState } from "react";

import { Icons } from "../../ui/icons.v2";

import { useUpdateCharacterStoryMutation } from "@/domain/lesson/character.mutations";
import { Editor } from "../../Editor";

export const StoryEditor = ({
  selectedChar,
  story: initStory,
  disableSave,
}: any) => {
  const [story, setStory] = useState("");

  const updateStoryMutation = useUpdateCharacterStoryMutation();

  const storyId = crypto.randomUUID();

  useEffect(() => {
    if (initStory) {
      setStory(initStory);
    }
  }, [initStory, setStory]);

  return (
    <div className="my-16 text-black dark:text-white justify-start w-full">
      <Editor
        key={initStory || story}
        readOnly={false}
        content={initStory || story}
        onUpdate={(val: any) => {
          setStory(val);
        }}
      />

      {/* {!disableSave && story && story !== selectedChar?.story && ( */}
      {story && story !== selectedChar?.story && (
        <button
          className="my-12"
          onClick={() => {
            return updateStoryMutation.mutateAsync({
              id: selectedChar?.id,
              story: story,
            } as any);
          }}
        >
          {updateStoryMutation.isPending ? (
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
