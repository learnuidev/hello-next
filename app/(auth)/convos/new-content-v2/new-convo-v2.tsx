import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YoutubeFlow } from "./youtube-flow/youtube-flow";
import { AudioFlow } from "./audio-flow/audio-flow";
import { VideoFlow } from "./video-flow/video-flow";
import { TextFlow } from "./text-flow/text-flow";

type ContentVariants = "youtube" | "audio" | "video" | "text" | "bilibili";
interface IContent {
  id: string;
  type: "youtube" | "audio" | "video" | "text" | "bilibili";
}

type ContentType = {
  id: string;
  title: string;
  Component: React.ComponentType;
};

const contentTypesList = [
  {
    id: "youtube",
    title: "Youtube",
    Component: YoutubeFlow,
  },
  {
    id: "audio",
    title: "Audio",
    Component: AudioFlow,
  },
  {
    id: "video",
    title: "Video",
    Component: VideoFlow,
  },
  {
    id: "text",
    title: "Text",
    Component: TextFlow,
  },
];

const contentTypes = contentTypesList.reduce<
  Record<ContentVariants, ContentType>
>(
  (acc, type) => {
    acc[type.id as ContentVariants] = type;
    return acc;
  },
  {} as Record<ContentVariants, ContentType>
);

export const NewContentV2 = () => {
  return (
    <div>
      <Tabs defaultValue={contentTypes.youtube.id}>
        <TabsList>
          {contentTypesList.map((contentType) => {
            return (
              <TabsTrigger key={contentType.id} value={contentType.id}>
                {contentType.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {contentTypesList.map((contentType) => {
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
