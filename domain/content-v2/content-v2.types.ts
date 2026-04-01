import { ContentStatus } from "../content-service/content-v2.types";
import { CoreStats } from "./series.types";

export enum ContentFormat {
  YOUTUBE = "youtube",
  AUDIO = "audio",
  TEXT = "text",
  WEBSITE = "website",
}

export interface CreatedAndUpdatedAt {
  createdAt: number;
  updatedAt: number;
}

export interface ContentStats extends CoreStats {}

export interface ContentV2Entity extends CreatedAndUpdatedAt {
  id: string;
  format: ContentFormat;
  status: ContentStatus;
  title: string;
  lang: string;
  seriesId: string;

  mediaTranscriptionsId: string;
  mediaId: string;

  stats: ContentStats;

  youtubeUrl: string;
}

export interface ContentV2 extends ContentV2Entity {
  mediaUrl: string;
  thumbnailUrl: string;
}

// const mockContentV2: ContentV2 = {
//   id: "9bb15585-472f-5e6a-a308-a1fc12df82ca",
//   format: ContentFormat.AUDIO,
//   status: ContentStatus.TRANSLATED,
//   title: "第2集-救人一命",
//   lang: "zh",
//   seriesId: "01KN2NC2KGY39MRWTERGTTFXTD",

//   mediaTranscriptionsId: "01KN4TN49EMYE99PM3NNECNSBR",
//   mediaId: "01KN4TMTC8XBRQGV94EXZ0KE9E",

//   createdAt: 1775057408360,
//   updatedAt: 1775057471312,
//   stats: {
//     averageRating: 0,
//     totalPlays: 0,
//     totalStars: 0,
//     totalCharacters: 431,
//     totalSentences: 47,
//     totalWords: 577,
//     totalHsk1Words: 68,
//     totalHsk2Words: 45,
//     totalHsk3Words: 54,
//     totalHsk4Words: 51,
//     totalHsk5Words: 37,
//     totalHsk6Words: 16,
//     totalHsk9Words: 76,
//     totalNonHskWords: 346,
//   },
// };
