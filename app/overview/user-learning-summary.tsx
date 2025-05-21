"use client";

import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";

import { useMemo } from "react";

export function UserLearningSummary() {
  const { data: profile } = useGetAuthUserProfileQuery();

  const userEmailHandle = useMemo(
    () => profile?.email?.split("@")?.[0],
    [profile?.email]
  );

  if (userEmailHandle) {
    return (
      <div className="mt-8 mb-8 text-lg rounded-2xl py-4 lg:py-8">
        <p className="font-extralight">
          Yo <span className="font-bold">{userEmailHandle}</span>, here is your
          learning summary:{" "}
        </p>
      </div>
    );
  }
}
