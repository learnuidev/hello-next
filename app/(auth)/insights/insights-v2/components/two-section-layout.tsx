"use client";

import { cn } from "@/lib/utils";

export const TwoSectionLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <section className="grid grid-cols-4 gap-4">{children}</section>;
};

export const TwoSectionLayoutItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("col-span-4 md:col-span-2", className)}>{children}</div>
  );
};
