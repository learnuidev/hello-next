import React from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Editor from "@monaco-editor/react";

type ReactChildrenProps = {
  children: React.ReactNode;
};

export const StepTitleContainer = ({ children }: ReactChildrenProps) => {
  return (
    <div className="flex items-center w-full justify-center">{children} </div>
  );
};

export const useNewConvoStore = create(
  persist(
    (set: any, get: any) => ({
      step: "audio",
      setStep: (step: any) => set({ step }),
      convo: {
        id: `mandarino#resource#${new Date().getTime()}`,
        type: "",
        author: "",
        location: "",
        level: 1,
        course: "",
        title: "",
        audio: "",

        safeLang: "en",
        targetLang: "zh",
      },
      setConvo2: (value: any) => set({ convo: value }),
      setConvo: (key: any, value: any) =>
        set({ convo: { ...get().convo, [key]: value } }),
    }),
    {
      name: "mandarino/step-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const StepTitle = ({ children }: ReactChildrenProps) => {
  return (
    <p className="w-full text-xl my-8 text-center font-extralight dark:text-gray-500">
      {children}
    </p>
  );
};

export const StepContainerVariant1 = ({ children }: ReactChildrenProps) => {
  return <div className="md:mx-32 md:mt-32 flex flex-wrap">{children}</div>;
};

export const StepInput = ({ value, onChange, onKeyDown, placeholder }: any) => {
  return (
    <input
      onChange={onChange}
      value={value}
      onKeyDown={onKeyDown}
      autoFocus
      placeholder={placeholder}
      className="w-full text-center text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
    />
  );
};

export const StepDebugger = () => {
  const convo = useNewConvoStore((state) => state.convo);

  return (
    <div className="my-16">
      <Editor
        height="400px"
        language="json"
        theme="vs-dark"
        value={JSON.stringify(convo, null, 2)}
        // onChange={handleEditorChange}
      />
    </div>
  );
};
