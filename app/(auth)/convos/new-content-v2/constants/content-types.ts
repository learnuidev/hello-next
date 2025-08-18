import { AudioFlow } from "../audio-flow/audio-flow";
import { BilibiliFlow } from "../bilibili-flow/bilibili-flow";
import {
  ContentV2Variants,
  ContentV2WithComponent,
} from "../new-content-v2.types";
import { TextFlow } from "../text-flow/text-flow";
import { VideoFlow } from "../video-flow/video-flow";
import { YoutubeFlow } from "../youtube-flow/youtube-flow";

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
  {
    id: "bilibili",
    title: "bilibili",
    Component: BilibiliFlow,
  },
];

export const contentTypesV2 = contentTypesListV2.reduce<
  Record<ContentV2Variants, ContentV2WithComponent>
>(
  (acc, type) => {
    acc[type.id as ContentV2Variants] = type;
    return acc;
  },
  {} as Record<ContentV2Variants, ContentV2WithComponent>
);
