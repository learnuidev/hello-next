import { IStats } from "@/domain/content-v2/series.types";
import { Star, Play } from "lucide-react";

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export interface CardProps {
  id: string;
  title: string;
  imageUrl: string;
  subtitle?: string;
  stats: IStats;
  onClick?: () => void;
}

export function ContentCard({
  id,
  title,
  imageUrl,
  subtitle,
  stats,
  onClick,
}: CardProps) {
  return (
    <div
      key={id}
      className="dark:hover:bg-[rgb(21,22,23)] hover:bg-gray-50 flex flex-col sm:flex-row border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-2">
        <div
          className="aspect-square sm:w-40 sm:flex-shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg truncate">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 truncate">{subtitle}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {stats.averageRating}
            </span>
            <span className="flex items-center gap-1">
              <Play className="w-4 h-4" />
              {formatNumber(stats.totalPlays)}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {formatNumber(stats.totalStars)}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              {formatNumber(stats.totalWords)} words
            </span>
            <span className="hidden sm:flex items-center gap-1">
              {formatNumber(stats.totalSentences)} sentences
            </span>
            <span className="hidden sm:flex items-center gap-1">
              {formatNumber(stats.totalCharacters)} 词
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
