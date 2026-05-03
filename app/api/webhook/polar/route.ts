// src/app/api/webhook/polar/route.ts
import { addUserContentPurchaseApi } from "@/libs/polar/add-user-content-purchase-api";
import { addUserPlanApi } from "@/libs/polar/add-user-plan-api";
import { polarApiConfig } from "@/libs/polar/polar-api-config";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: polarApiConfig.webhookSecret,
  onPayload: async (payload) => {},
  onOrderCreated: async (payload) => {
    const orderId = payload.data.id;
    const userEmail = payload.data.customer.email;
    const contentId = `${Date.now()}-content`;
    // const contentId = payload.data?.metadata?.contentId || `${Date.now()}`;

    console.log("PAY LOAD", payload);

    if (contentId) {
      console.log("Content successfully added");

      await addUserContentPurchaseApi({
        userEmail,
        orderId,
        contentId,
        payload,
      });
    } else {
      await addUserPlanApi({ orderId, userEmail });
      console.log("Plan successfully created");
    }

    console.log("Plan successfully created");
  },

  onSubscriptionCanceled: async (payload) => {
    console.log("subscription cancelled");
    console.log("payload", payload);
  },

  onSubscriptionCreated: async (payload) => {
    console.log("subscription created");
    console.log("payload", payload);
  },
});
