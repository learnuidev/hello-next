"use client";

import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";

import { useMemo } from "react";
import { useGetActiveUserPlan } from "../(auth)/plans/hooks/use-get-active-user-plan";
import { UserPlan, userPlanStatus } from "../(auth)/plans/plans.types";
import { cn } from "@/lib/utils";

function determineColor(memberPlanType: UserPlan) {
  if (memberPlanType?.daysTillExpiry) {
    if (memberPlanType?.daysTillExpiry < 30) {
      return "text-green-500";
    }

    if (memberPlanType?.daysTillExpiry < 7) {
      return "text-orange-500";
    }
  }
}

function PlansBanner() {
  const { data: memberPlanType } = useGetActiveUserPlan();

  if (memberPlanType?.userStatus === userPlanStatus.pro) {
    return <p className="font-bold text-pink-500"> {userPlanStatus.pro} </p>;
  }

  if (
    memberPlanType?.userStatus === userPlanStatus.free &&
    !memberPlanType?.isExpired
  ) {
    return (
      <p>
        <span className={cn(determineColor(memberPlanType), "font-bold")}>
          {userPlanStatus.free}{" "}
        </span>
        <span>({memberPlanType?.daysTillExpiry} days remaining) </span>
      </p>
    );
  }
  if (
    memberPlanType?.userStatus === userPlanStatus.free &&
    memberPlanType?.isExpired
  ) {
    return <p>{userPlanStatus.free}. Your membership has expired</p>;
  }

  return;
}

export function UserLearningSummary() {
  const { data: profile } = useGetAuthUserProfileQuery();

  const userEmailHandle = useMemo(
    () => profile?.email?.split("@")?.[0],
    [profile?.email],
  );

  return (
    <div className="mt-8 mb-8 text-lg rounded-2xl py-4 lg:py-8">
      <div
        className="flex 

        sm:justify-between sm:items-center flex-col-reverse sm:flex-row gap-4"
      >
        {userEmailHandle ? (
          <p className="font-extralight">
            Yo <span className="font-bold">{userEmailHandle}</span>, here is
            your learning summary:{" "}
          </p>
        ) : (
          <div></div>
        )}

        <PlansBanner />
      </div>
    </div>
  );
}
