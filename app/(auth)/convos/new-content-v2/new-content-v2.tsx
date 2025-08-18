import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { contentTypesListV2, contentTypesV2 } from "./constants/content-types";

export const NewContentV2 = () => {
  // come back to this later
  // const isNewContentEnabled = useIsNewContentFormEnabled();

  // console.log("NEW CONTENT", isNewContentEnabled);

  // if (!isNewContentEnabled) {
  //   return <NewConvo />;
  // }

  return (
    <div className="px-8 sm:px-32">
      <h1 className="text-2xl font-bold mt-12 mb-8">New Content</h1>
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
