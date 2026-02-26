import { siteConfig } from "@/lib/config";
import { useMutation } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

export interface SendSMSParams {
  phone: string;
  message: string;
}
const sendSMS = async (
  params: SendSMSParams,
  opts: { Authorization: string }
) => {
  const url = `${siteConfig.contentApi}/v1/sms`;

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

export const useSendSMSMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return useMutation({
    mutationFn: async (params: SendSMSParams) => {
      return await sendSMS(params, { Authorization: authUser?.jwt });
    },
  });
};
