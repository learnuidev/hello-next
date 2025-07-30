// src/app/api/webhook/polar/route.ts
import { addUserPlanApi } from "@/libs/polar/add-user-plan-api";
import { polarApiConfig } from "@/libs/polar/polar-api-config";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: polarApiConfig.webhookSecret,
  onPayload: async (payload) => {},
  onOrderCreated: async (payload) => {
    const orderId = payload.data.id;
    const userEmail = payload.data.customer.email;

    await addUserPlanApi({ orderId, userEmail });

    console.log("Plan successfully created");
  },

  onSubscriptionCanceled: async (payload) => {
    console.log("SUBSCRIPTION CANCELLED");
    console.log("PAYLOAD", payload);
  },

  onSubscriptionCreated: async (payload) => {
    console.log("SUBSCRIPTION CREATED");
    console.log("PAYLOAD", payload);
  },
});
