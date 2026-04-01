import { TopicType } from "../topic/topic.types";
import { Source } from "./source.types";

export interface HskStats {
  hsk1Words: number;
  hsk2Words: number;
  hsk3Words: number;
  hsk4Words: number;
  hsk5Words: number;
  hsk6Words: number;
  hsk9Words: number;
  nonHskWords: number;
}
export interface CoreStats extends HskStats {
  totalCharacters: number;
  totalSentences: number;
  totalWords: number;

  averageRating: number;
  totalPlays: number;
  totalStars: number;
}

export interface AddSeriesParams {
  title: string;
  topicType: TopicType;
  sourceId: string;
  backgroundImageAssetId: string;
}

export interface Series {
  id: string;
  userId: string;
  topicType: TopicType;
  title: string;
  sourceId: string;
  source: Source;
  backgroundImageAssetId?: string;
  backgroundImage?: string;
  stats: CoreStats;
  createdAt: number;
  updatedAt: number;
}

export type SeriesWithBackgroundImage = Series & {
  backgroundImage: string;
};
