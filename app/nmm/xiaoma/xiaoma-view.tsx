"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { belts } from "../utils";
import { useBeltStore } from "@/components/use-belt-store";
import { useSearchQueryStore } from "@/components/search/state";
import { Icons } from "@/components/ui/icons.v2";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { cn } from "@/lib/utils";
import { XiaomaViewType } from "./xiaoma-view-type";

function Xiaoma() {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
  const setSelectedBelt = useBeltStore((x) => x?.setSelectedBelt);

  const setViewType = useSearchQueryStore((state) => state.setType);
  const viewType = useSearchQueryStore((state) => state.type);
  return (
    <Tabs defaultValue="core" className="p-0">
      <div className="my-2 md:my-8 flex justify-between items-center md:mx-12 flex-col md:flex-row space-y-4 md:space-y-0">
        <TabsList className="space-x-8">
          <TabsTrigger
            value="core"
            className="px-0 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
          >
            <Icons.rocket className="text-xl md:text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            value="needs_review"
            className="px-0 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
          >
            <Icons.graduationCap className="text-xl md:text-2xl" />
          </TabsTrigger>
          <TabsTrigger
            // value="learned"
            value="all"
            className="px-0 data-[state=active]:text-white data-[state=inactive]:text-gray-600"
          >
            <Icons.globeAsia className="text-xl md:text-2xl" />
          </TabsTrigger>
        </TabsList>

        <div className="space-x-8">
          <button
            onClick={() => {
              setViewType("character");
            }}
            value="characters"
            className={cn(
              viewType === "character" ? "dark:text-white" : " text-gray-500",
              "px-0 "
            )}
          >
            <Icons.seedling className="text-xl md:text-2xl" />
          </button>
          <button
            onClick={() => {
              setViewType("word");
            }}
            className={cn(
              viewType === "word" ? "dark:text-white" : " text-gray-500",
              "px-0 "
            )}
          >
            <Icons.tree className="text-xl md:text-2xl" />
          </button>
          <button
            // value="learned"
            onClick={() => {
              setViewType("sentence");
            }}
            className={cn(
              viewType === "sentence" ? "dark:text-white" : " text-gray-500",
              "px-0 "
            )}
          >
            <Icons.trees className="text-xl md:text-2xl" />
          </button>
        </div>

        {
          <div className="space-x-4">
            {belts?.map?.((belt) => {
              return (
                <button
                  key={belt?.fill}
                  onClick={() => {
                    setSelectedBelt(belt as any);
                  }}
                  className={`${
                    selectedBelt !== null &&
                    belt?.level === (selectedBelt?.level as any)
                      ? belt?.fill
                      : belt?.unselected
                  } h-4 w-4 rounded-full text`}
                ></button>
              );
            })}
          </div>
        }
      </div>

      <TabsContent value="core" className="my-4 md:my-8">
        <XiaomaViewType variant="core" />
      </TabsContent>

      {/* ?.slice(selectedBelt?.minCharacterLevel, selectedBelt?.maxCharacterLevel) */}

      <TabsContent value="needs_review" className="my-4 md:my-8">
        <XiaomaViewType variant="needs_review" />
      </TabsContent>

      <TabsContent value="all" className="my-4 md:my-8">
        <XiaomaViewType variant="all" />
      </TabsContent>
    </Tabs>
  );
}

export const XiaomaView = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "all";
}) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  const mode = useLearningModeStore((state: any) => state.mode);

  if (mode === "xiaoma") {
    return <Xiaoma />;
  }

  if (!queryStr?.toLowerCase()?.includes("xiaoma")) {
    return children;
  }

  return <Xiaoma />;
};
