import { verifyJwt } from "@/libs/cognito/jwt";
import { headers } from "next/headers";
import { listUserPlansApi } from "./list-user-plans.api";
import { polarApi } from "@/libs/polar/polar-api";

export const maxDuration = 60;

export async function GET(req: Request) {
  const headersApi = await headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: false });

  if (isVerified) {
    const userPlans = (await listUserPlansApi(isVerified.email)) as any;

    for (const userPlan of userPlans) {
      const order = await polarApi.orders.get({ id: userPlan.id });

      userPlan.productId = order.product.id;
      userPlan.userStatus =
        order.product.name === "Mandarino Pro" ? "Pro" : "Free";
    }

    return Response.json(userPlans);
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
