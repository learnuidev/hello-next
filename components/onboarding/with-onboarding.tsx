import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const WithOnboarding = ({ children }: { children: React.ReactNode }) => {
  const [targetLang, setTargetLang] = useState("");
  const [sourceLang, setSourceLang] = useState("");

  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const { data: userPreferences, isLoading } = useGetUserPreferenceQuery();

  const targetLanguage = userPreferences?.targetLanguage;
  const sourceLanguage = userPreferences?.sourceLanguage;

  const queryClient = useQueryClient();

  const _recentlyWatched = userPreferences?.recentlyWatched || {};

  const updateTargetAndSourceLangauge = () => {
    updateUserPreferenceMutation
      .mutateAsync({
        targetLanguage: targetLang,
        sourceLanguage: sourceLang,
      })
      .then((resp) => {
        // @ts-ignore
        queryClient.refetchQueries([getUserPreferenceKey]);
      });
  };

  if (isLoading) {
    return;
  }

  if (targetLanguage && sourceLanguage) {
    return children;
  }

  return (
    <div className="max-w-2xl m-auto mx-8 mt-32">
      <div className="space-y-8">
        <section className="flex flex-col">
          <label htmlFor="" className="mb-2 text-gray-500">
            Source Language
          </label>

          <input
            className="h-12"
            placeholder="Source Language"
            value={sourceLang}
            onChange={(event) => {
              setSourceLang(event.target.value);
            }}
          />
        </section>
        <section className="flex flex-col">
          <label htmlFor="" className="mb-2 text-gray-500">
            Target Language
          </label>

          <input
            className="h-12"
            placeholder="Target Language"
            value={targetLang}
            onChange={(event) => {
              setTargetLang(event.target.value);
            }}
          />
        </section>

        <button
          disabled={!sourceLang || !targetLang}
          onClick={() => {
            updateTargetAndSourceLangauge();
          }}
        >
          {updateUserPreferenceMutation.isPending ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};
