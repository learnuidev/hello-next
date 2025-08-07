"use client";

import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";

import { useMemo } from "react";
import { useGetActiveUserPlan } from "../(auth)/plans/hooks/use-get-active-user-plan";
import { userPlanStatus } from "../(auth)/plans/plans.types";

function PlansBanner() {
  const { data: memberPlanType } = useGetActiveUserPlan();

  if (memberPlanType?.userStatus === userPlanStatus.pro) {
    return <p> {userPlanStatus.pro} </p>;
  }

  if (
    memberPlanType?.userStatus === userPlanStatus.free &&
    !memberPlanType?.isExpired
  ) {
    return (
      <p>
        {userPlanStatus.free} (you have {memberPlanType?.daysTillExpiry} days
        remaining){" "}
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
    [profile?.email]
  );

  if (userEmailHandle) {
    return (
      <div className="mt-8 mb-8 text-lg rounded-2xl py-4 lg:py-8">
        <div className="flex justify-between items-center">
          <p className="font-extralight">
            Yo <span className="font-bold">{userEmailHandle}</span>, here is
            your learning summary:{" "}
          </p>

          <PlansBanner />
        </div>
      </div>
    );
  }
}
