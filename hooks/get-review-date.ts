"use client";

import { getDate, getMonth, getYear } from "date-fns";

export function getReviewDate(item: { createdAt: number }) {
  const createdAt = new Date(item?.createdAt);
  const date = getDate(createdAt);
  const month = getMonth(createdAt) + 1;
  const year = getYear(createdAt);

  return {
    reviewDate: `${month}/${date}/${year}`,
    date,
    month,
    year,
  };
}
