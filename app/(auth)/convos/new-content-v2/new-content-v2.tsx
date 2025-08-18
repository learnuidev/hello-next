import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { contentTypesListV2, contentTypesV2 } from "./constants/content-types";
import { useIsNewContentFormEnabled } from "@/libs/posthog/hooks/use-is-new-content-form-enabled";
import { NewConvo } from "../new-convo/new-convo";
import { useViewModeStore } from "../new-convo/use-viewmode-store";
import { Icons } from "@/components/ui/icons.v2";

export const NewContentV2 = () => {
  const isNewContentEnabled = useIsNewContentFormEnabled();
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  // come back to this later
  if (!isNewContentEnabled && false) {
    return <NewConvo />;
  }

  return (
    <div className="px-8 sm:px-32">
      <div className="space-x-4 my-8">
        <button
          className="text-xl md:text-4xl dark:hover:text-white dark:text-slate-600 shadow-md rounded-full"
          onClick={() => {
            setViewMode("");
          }}
        >
          <Icons.xMark />
        </button>
      </div>

      <h1 className="text-xl font-bold mt-12 mb-8">New Content</h1>
      <Tabs defaultValue={contentTypesV2.youtube.id} className="bg-none">
        <TabsList className="bg-white dark:bg-[rgb(9,10,11)] gap-8 p-0">
          {contentTypesListV2.map((contentType) => {
            return (
              <TabsTrigger
                className="px-0 data-[state=active]:shadow-none"
                key={contentType.id}
                value={contentType.id}
              >
                {contentType.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-8">
          {contentTypesListV2.map((contentType) => {
            return (
              <TabsContent
                value={contentType.id}
                key={`tab-body-${contentType.id}`}
              >
                <contentType.Component />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
};
