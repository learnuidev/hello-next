"use client";

import { Authenticated } from "@/components/Authenticated";
import { ProfilePage } from "./profile/profile-page";

export default function Home() {
  return (
    <Authenticated>
      <ProfilePage />
    </Authenticated>
  );
}
