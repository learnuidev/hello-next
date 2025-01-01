// import Image from 'next/image'
"use client";

import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";

import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";
import { Editor } from "../Editor";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCharacterId } from "@/app/(auth)/character/[character-id]/use-get-character-id";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useUpdateComponentSummaryMutation } from "@/domain/component-summary/update-component-summary";

import { create } from "zustand";
import { Icons } from "../ui/icons.v2";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";

export const useSummaryStore = create((set) => ({
  summary: "",
  setSummary: (id: string) => set(() => ({ summary: id })),
}));

export function Summary({
  characterId,
  showMeanings,
}: {
  characterId: string;
  showMeanings: boolean;
}) {
  const characaterId = useGetCharacterId();

  const lang = useGetCurrentLang();

  const router = useRouter();
  const updateSummaryMutation = useUpdateComponentSummaryMutation();

  const summary = useSummaryStore((state: any) => state.summary);
  const isSuperAdmin = useIsSuperAdmin();
  const searchParams = useSearchParams();

  const setSummary = useSummaryStore((state: any) => state.setSummary);
  const statusUrl = searchParams.get("status-url");

  const { data: meaning, isLoading } = useListMeaningsQuery(
    {
      content: characaterId,
      lang,
    },
    {
      onSuccess: (data: any) => {
        console.log("");
        if (lang) {
          router.push(
            `/nmm/${characterId}?lang=${data?.lang ? data?.lang : lang}${statusUrl ? `&status-url=${statusUrl}` : ``}`
          );
        }
      },
    }
  );

  let meaningResponse = meaning as ListMeaningsResponse;

  if (isLoading) {
    return null;
  }

  return (
    <main className="">
      <div className="">
        <div className="">
          {meaningResponse?.summary && (
            <Editor
              readOnly={false}
              content={meaningResponse?.summary || summary}
              onUpdate={(val: any) => {
                // console.log("VAL", val);
                setSummary(val);
                // updateSummaryMutation.mutate
              }}
            />
          )}

          {isSuperAdmin &&
            Boolean(summary) &&
            JSON.stringify(summary) !==
              JSON.stringify(meaningResponse?.summary) && (
              <button
                className="my-12"
                onClick={() => {
                  return updateSummaryMutation
                    .mutateAsync({
                      id: meaningResponse?.id,
                      summary,
                    })
                    .then(() => {
                      console.log("Summary Successfully Updated");
                    });
                }}
              >
                {updateSummaryMutation.isLoading ? (
                  <Icons.spinner spinPulse />
                ) : false ? (
                  <Icons.checkCircle className="transition" />
                ) : (
                  "Save"
                )}
              </button>
            )}
        </div>
      </div>
    </main>
  );
}
