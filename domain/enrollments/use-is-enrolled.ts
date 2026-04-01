"use client";

import { useGetEnrollmentQuery } from "./use-get-enrollment-query";

export function useIsEnrolled(seriesId: string) {
  const { data: enrollmentData, isLoading } = useGetEnrollmentQuery(
    { seriesId },
    { retry: false },
  );

  const isEnrolled = !!enrollmentData?.enrollment;

  return {
    isEnrolled,
    enrollment: enrollmentData?.enrollment || null,
    isLoading,
  };
}
