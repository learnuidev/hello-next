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
    <div>
      <Tabs defaultValue={contentTypesV2.youtube.id}>
        <TabsList>
          {contentTypesListV2.map((contentType) => {
            return (
              <TabsTrigger key={contentType.id} value={contentType.id}>
                {contentType.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

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
      </Tabs>
    </div>
  );
};
