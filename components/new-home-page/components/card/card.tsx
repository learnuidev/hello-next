import { IStats } from "@/domain/content-v2/series.types";

export interface CardProps {
  id: string;
  title: string;
  imageUrl: string;
  subtitle?: string;
  stats: IStats;
  onClick?: () => void;
}

export function Card({ id, title, imageUrl, subtitle, stats, onClick }: CardProps) {
  return (
    <div
      key={id}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div
        className="aspect-square bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 truncate">{subtitle}</p>}
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <span>★ {stats.averageRating}</span>
          <span>{stats.totalPlays} plays</span>
        </div>
      </div>
    </div>
  );
}
