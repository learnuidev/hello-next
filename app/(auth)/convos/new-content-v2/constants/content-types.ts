// import { AudioFlow } from "./audio-flow/audio-flow";
// import { TextFlow } from "./text-flow/text-flow";
// import { VideoFlow } from "./video-flow/video-flow";
// import { YoutubeFlow } from "./youtube-flow/youtube-flow";

import { AudioFlow } from "../audio-flow/audio-flow";
import { TextFlow } from "../text-flow/text-flow";
import { VideoFlow } from "../video-flow/video-flow";
import { YoutubeFlow } from "../youtube-flow/youtube-flow";

type ContentVariants = "youtube" | "audio" | "video" | "text" | "bilibili";

export interface IContent {
  id: string;
  type: "youtube" | "audio" | "video" | "text" | "bilibili";
}

type ContentType = {
  id: string;
  title: string;
  Component: React.ComponentType;
};

export const contentTypesListV2 = [
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

export const contentTypesV2 = contentTypesListV2.reduce<
  Record<ContentVariants, ContentType>
>(
  (acc, type) => {
    acc[type.id as ContentVariants] = type;
    return acc;
  },
  {} as Record<ContentVariants, ContentType>
);
