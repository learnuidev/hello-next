import { TopicType } from "../topic/topic.types";
import { Source } from "./source.types";

export interface IStats {
  averageRating: number;
  totalPlays: number;
  totalStars: number;

  totalCharacters: number;
  totalSentences: number;
  totalWords: number;
}

export type SeriesStats = IStats & {};

export interface AddSeriesParams {
  title: string;
  topicType: TopicType;
  sourceId: string;
  backgroundImageAssetId: string;
}
export interface Series {
  id: string;
  topicType: TopicType;
  title: string;
  backgroundImageUrl: string;
  source: Source;
  stats: SeriesStats;
}
