import { siteConfig } from "@/lib/config";
import { useMutation } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

interface ParseHtmlRequest {
  websiteUrl: string;
}
interface ParseHtmlResponse {
  html: string;
}

const parseHtmlApi = async (
  params: ParseHtmlRequest,
  opts: { Authorization: string }
): Promise<ParseHtmlResponse> => {
  const url = `${siteConfig.apiUrl}/v1/parse-html`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },

    body: JSON.stringify(params),
  });
  const resp = await res.json();

  return resp;
};

export const useParseHtmlMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return useMutation({
    mutationFn: async (params: ParseHtmlRequest) => {
      return await parseHtmlApi(params, { Authorization: authUser?.jwt });
    },
  });
};
