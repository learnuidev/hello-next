"use client";
import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { NoPermissionView } from "../doctor/no-permission-view";

import { DuCourses } from "./components/du-courses/du-courses";
import { DuLevelSelector } from "./components/du-level-selector/du-level-selector";
import { WithVerifiedUser } from "./components/with-verified-user";

export default function DuChinse() {
  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return <NoPermissionView />;
  }
  return (
    <WithVerifiedUser>
      <div>
        <NavBar />

        <div className="mt-8 md:mx-12 mb-32">
          <DuLevelSelector />
          <DuCourses />
        </div>

        <FloatingNavbar />
      </div>
    </WithVerifiedUser>
  );
}
