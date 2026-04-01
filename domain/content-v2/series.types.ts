import { TopicType } from "../topic/topic.types";
import { Source } from "./source.types";

export interface HskStats {
  totalHsk1Words: number;
  totalHsk2Words: number;
  totalHsk3Words: number;
  totalHsk4Words: number;
  totalHsk5Words: number;
  totalHsk6Words: number;
  totalHsk9Words: number;
  totalNonHskWords: number;
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
  description?: string;
  topicType: TopicType;
  sourceId: string;
  backgroundImageAssetId: string;
}

export interface Series {
  id: string;
  userId: string;
  topicType: TopicType;
  title: string;
  description: string;
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
