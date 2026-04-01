"use client";

import { useListEnrollmentsQuery } from "./use-list-enrollments-query";
import { useMemo } from "react";

export function useIsEnrolled(seriesId: string) {
  const { data, isLoading } = useListEnrollmentsQuery({ limit: 100 });

  const isEnrolled = useMemo(() => {
    if (!data?.enrollments) return false;

    return data.enrollments.some(
      (enrollment) =>
        enrollment.seriesId === seriesId && enrollment.status === "active",
    );
  }, [data, seriesId]);

  const enrollment = useMemo(() => {
    if (!data?.enrollments) return null;

    return data.enrollments.find(
      (enrollment) =>
        enrollment.seriesId === seriesId && enrollment.status === "active",
    );
  }, [data, seriesId]);

  return {
    isEnrolled,
    enrollment,
    isLoading,
  };
}
