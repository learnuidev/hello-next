import { TopicType } from "../topic/topic.types";

export interface IStats {
  averageRating: number;
  totalPlays: number;
  totalStars: number;
}

export type SeriesStats = IStats & {};

interface Source {
  id: string;
  title: string;
}

export interface Series {
  id: string;
  topicType: TopicType;
  title: string;
  source: Source;
  stats: SeriesStats;
  backgroundImage: string;
}
