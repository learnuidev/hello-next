"use client";

import { Button } from "@/components/ui/button";
import {
  SendSMSParams,
  useSendSMSMutation,
} from "@/domain/content-service/use-send-sms.mutation";

export function SendSMSButton(props: SendSMSParams) {
  const sendSmsMutation = useSendSMSMutation();

  return (
    <Button
      onClick={() => {
        sendSmsMutation
          .mutateAsync(props)
          .then(() => {
            alert("success");
          })
          .catch(() => {
            alert("error");
          });
      }}
    >
      Send SMS
    </Button>
  );
}
