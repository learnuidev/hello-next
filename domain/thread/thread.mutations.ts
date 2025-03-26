"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { queryIds } from "../lesson/queryIds";
import { siteConfig } from "@/lib/config";
import { listThreadsQueryId } from "./thread.queries";

const addThreadUrl = `${siteConfig.apiUrl}/v1/add-thread`;

type AddThreadParams = {
  query: string;
  messages: any;
  id: string;
};

const addThread = async (
  params: AddThreadParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(addThreadUrl, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useAddThreadMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: AddThreadParams) => {
      const response = await addThread(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    {
      ...options,
      onSuccess: (data) => {
        if (options?.onSucess) {
          options?.onSuccess(data);
        }

        queryClient.invalidateQueries([listThreadsQueryId]);
      },
    }
  );
}

// ====
const updateThreadMessagesUrl = `${siteConfig.apiUrl}/v1/update-messages`;

type UpdateThreadMessagesParams = {
  threadId: string;
  messages: any;
};

const updateThreadMessages = async (
  params: UpdateThreadMessagesParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(updateThreadMessagesUrl, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useUpdateThreadMessagesMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: UpdateThreadMessagesParams) => {
      const response = await updateThreadMessages(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    {
      ...options,
      onSuccess: (data) => {
        if (options?.onSucess) {
          options?.onSuccess(data);
        }

        queryClient.invalidateQueries([listThreadsQueryId]);
      },
    }
  );
}
