"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import {
  CreateEnrollmentRequest,
  CreateEnrollmentResponse,
} from "./enrollments.types";

const createEnrollment = async (
  params: CreateEnrollmentRequest,
  opts: {
    Authorization: string;
  },
): Promise<CreateEnrollmentResponse> => {
  const res = await fetch(`${siteConfig.contentApi}/v1/enrollments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    if (res.status === 409) {
      throw new Error("Already enrolled in this series");
    }
    throw new Error("Failed to create enrollment");
  }

  const resp = await res.json();
  return resp;
};

export function useCreateEnrollmentMutation() {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation<CreateEnrollmentResponse, Error, CreateEnrollmentRequest>({
    mutationFn: async (params) => {
      const response = await createEnrollment(params, {
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
