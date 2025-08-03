"use client";

import { IStatItem } from "@/app/insights-overview/components/profile-stats-item";
import Link from "next/link";

export const InsightItem = ({
  children,
  stat,
  title,
  subtitle,
  href,
}: IStatItem & {
  href?: string;
}) => {
  if (href) {
    return (
      <Link className="flex items-center flex-col" href={href}>
        {children}
        <p className="text-2xl md:text-3xl">{stat}</p>
        <h3 className="text-[12px] text-gray-500 uppercase font-extralight">
          {title}
        </h3>
      </Link>
    );
  }
  return (
    <div className="flex items-center flex-col">
      {children}
      <p className="text-2xl md:text-3xl">{stat}</p>
      <h3 className="text-[12px] text-gray-500 uppercase font-extralight">
        {title}
      </h3>
    </div>
  );
};
