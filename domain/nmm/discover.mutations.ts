"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { queryIds } from "../lesson/queryIds";
import { listComponentsQueryKey } from "../lesson/component.queries";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/discover";

type DiscoverParams = {
  hanzi: string;
  lang?: string;
};

const discover = async (
  params: DiscoverParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useDiscoverMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: DiscoverParams) => {
      const response = await discover(params, {
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

        queryClient.invalidateQueries([listComponentsQueryKey]);
      },
    }
  );
}

export const discoverHanziQueryId = "discover-hanzi";

export function useDiscoverHanziQuery(params: DiscoverParams) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [discoverHanziQueryId, params.hanzi],
    queryFn: async () => {
      if (authUser?.jwt && params?.hanzi) {
        const response = await discover(params, {
          Authorization: authUser?.jwt,
        });
        return response;
      }
    },

    enabled: Boolean(authUser?.jwt) && Boolean(params?.hanzi),
  });
}

`
jwt = 'eyJraWQiOiJqTUMrN1Jabm1aY1hVN0R4RDF4a2FhNWxqUVc4bFhtN0xKXC9iWFpzdmZkTT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyYjJmZjVlMS1lMjQ0LTQwY2EtYWJlYS1lY2ZiZTVjNDMzZDQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfTmJPa204V2RRIiwiY29nbml0bzp1c2VybmFtZSI6IjJiMmZmNWUxLWUyNDQtNDBjYS1hYmVhLWVjZmJlNWM0MzNkNCIsIm9yaWdpbl9qdGkiOiJhOTk1NDRkNS05MGI4LTQ0ZjEtOWIxNi1jNjRiNzQ2ZjU2NGMiLCJhdWQiOiI1bm9ob2JtbmpsN3A3b3UzZW1uZ2Fuc2FrNCIsImV2ZW50X2lkIjoiYmZjNjk2OGYtOTdmYy00OWExLWEwOGUtODNlMjgzOGUwMjZkIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MjEzMTkzMDYsImV4cCI6MTcyMjM5NDYyNywiaWF0IjoxNzIyMzkxMDI3LCJqdGkiOiIxODliMTc2ZC0yZDMwLTQ3ZDItODE3OC0wYzM5OTliMDU1YjgiLCJlbWFpbCI6ImxlYXJudWlkZXZAZ21haWwuY29tIn0.r9Qvu4Z5xyD7U8SJwlIAgs5ejZtUg58DX9w6kE1P5_W5UOTQA3pAf8PD-pam7uth_y3Bh5AyL_uc6fhj8QotPyT5gldvUxJ7bUyr7JWC1BcwSlzVX1tZl3AEishDHZin_jFllzALjmESBfmjwBuS3dR9IagMkQqJI9RyY51MW9MI94qu8UdCTt_7rZQ_IeQvMAsnvFd1u5TAkAtyORZW3xzZRbQDzxFmw9YrSuHV_Z2ljzabNI9N2sjGVlfaqDc8dnhuCQ9nzblcW-Rrs-n0GOvGMqeEdzmNs7e3ZDOw7z3PsG2Nz0fsKqudK3W3V2OH2eONmEstkKb6n43x5gE10g'

const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/discover";

await Promise.all(obj.filter(item => item.level < 4000 && !item.group)?.map(async item => {
    return await fetch(url, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
            Authorization: jwt
    }
})
    
}))

`;
