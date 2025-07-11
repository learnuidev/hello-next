/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/ui/icons.v2";
import { languages } from "./languages";
import { useState } from "react";
import { useAddTranslationHistoryMutation } from "./hooks/use-add-translation-history-mutation";
import { useRouter } from "next/navigation";
import { useFeatureContext } from "../feature-context-provider";

export const NewPhrase = ({ cancelNewChat }: { cancelNewChat: () => void }) => {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("zh-CN");
  const [title, setTitle] = useState("");

  const { rootUrl } = useFeatureContext();

  const router = useRouter();

  const addTranslationHistoryMutation = useAddTranslationHistoryMutation();

  return (
    <div>
      <button
        onClick={() => {
          cancelNewChat();
        }}
      >
        <Icons.xMark />{" "}
      </button>

      <section className="flex justify-center items-center flex-col">
        <h2 className="text-center text-2xl font-extralight mt-12">title</h2>

        <input
          onChange={(event) => {
            setTitle(event?.target?.value);
          }}
          value={title}
          autoFocus
          placeholder=""
          className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full max-w-3xl m-auto text-center text-3xl font-extralight focus:outline-0  p-2 border-0 border-none dark:text-gray-300"
        />
      </section>

      <section>
        <h2 className="text-center text-2xl font-extralight mt-12">
          Select Source Language
        </h2>

        <div className="flex justify-center space-x-8 mt-8">
          {languages.map((lang) => {
            return (
              <button
                key={lang.id}
                onClick={() => {
                  setSourceLang(lang.id);
                }}
                className={sourceLang === lang.id ? "text-white" : "opacity-40"}
              >
                <img src={lang.src} alt={lang.title} className="h-8" />
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-extralight mt-12">
          Select Target Language
        </h2>

        <div className="flex justify-center space-x-8 mt-8">
          {languages.map((lang) => {
            return (
              <button
                key={lang.id}
                onClick={() => {
                  setTargetLang(lang.id);
                }}
                className={targetLang === lang.id ? "text-white" : "opacity-40"}
              >
                <img src={lang.src} alt={lang.title} className="h-8" />
              </button>
            );
          })}
        </div>
      </section>

      {title && (
        <div className="flex justify-center items-center mt-12">
          <button
            disabled={!title}
            onClick={() => {
              addTranslationHistoryMutation
                .mutateAsync({
                  title,
                  sourceLang,
                  targetLang,
                })
                .then((resp) => {
                  cancelNewChat();
                  router.push(
                    `${rootUrl}?feature-id=phrase&contextId=${resp?.id}`
                  );
                });
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};
