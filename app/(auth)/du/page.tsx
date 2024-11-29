"use client";
import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { NoPermissionView } from "../doctor/no-permission-view";

import { DuCourses } from "./components/du-courses/du-courses";

export default function DuChinse() {
  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return <NoPermissionView />;
  }
  return (
    <div>
      <NavBar />

      <div className="mt-8 md:mx-12">
        <DuCourses />
      </div>

      <FloatingNavbar />
    </div>
  );
}
