"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { DeleteEnrollmentResponse } from "./enrollments.types";

const deleteEnrollment = async (
  seriesId: string,
  opts: {
    Authorization: string;
  },
): Promise<DeleteEnrollmentResponse> => {
  const res = await fetch(
    `${siteConfig.contentApi}/v1/enrollments/series/${seriesId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to delete enrollment");
  }

  const resp = await res.json();
  return resp;
};

export function useDeleteEnrollmentMutation() {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation<DeleteEnrollmentResponse, Error, string>({
    mutationFn: async (seriesId) => {
      const response = await deleteEnrollment(seriesId, {
        Authorization: authUser?.jwt,
      });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["get-series-details"] });
    },
  });
}
