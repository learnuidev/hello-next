import { verifyJwt } from "@/libs/cognito/jwt";
import { headers } from "next/headers";
import { listUserPlansApi } from "./list-user-plans.api";
import { polarApi } from "@/libs/polar/polar-api";
import { isFreePlanExpired } from "@/app/(auth)/plans/utils/is-free-plan-expired";
import {
  productNames,
  UserPlan,
  userPlanStatus,
} from "@/app/(auth)/plans/plans.types";

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
        order.product.name === productNames.pro
          ? userPlanStatus.pro
          : userPlanStatus.free;

      const isExpired = isFreePlanExpired(userPlan);

      if (userPlan?.userStatus === userPlanStatus.free && isExpired) {
        userPlan.isExpired = isExpired.isExpired;
        userPlan.daysTillExpiry = isExpired.daysTillExpiry;
      }
    }

    return Response.json(userPlans as UserPlan[]);
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
