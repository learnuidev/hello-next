import { IStats } from "@/domain/content-v2/series.types";
import { Star, Play } from "lucide-react";
import { motion } from "framer-motion";

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
  href?: string;
}

export function ContentCard({
  id,
  title,
  imageUrl,
  subtitle,
  stats,
  onClick,
  href,
}: CardProps) {
  return (
    <motion.div
      key={id}
      className="dark:hover:bg-[rgb(14,15,16)] dark:bg-[rgb(11,12,13)] hover:bg-gray-100 bg-gray-50 flex flex-col sm:flex-row shadow rounded-lg overflow-hidden cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="p-2">
        <motion.div
          className="aspect-square sm:w-40 sm:flex-shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <div>
          <motion.h3
            className="font-semibold text-lg truncate"
            whileHover={{ color: "rgb(244, 63, 94)" }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {title}
          </motion.h3>
          {subtitle && (
            <p className="text-sm text-gray-500 truncate">{subtitle}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span className="hidden sm:flex items-center gap-1">
              {formatNumber(stats.totalCharacters)} 字
            </span>
            <span className="hidden sm:flex items-center gap-1">
              {formatNumber(stats.totalWords)} 词
            </span>
            <span className="hidden sm:flex items-center gap-1">
              {formatNumber(stats.totalSentences)} 句
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
