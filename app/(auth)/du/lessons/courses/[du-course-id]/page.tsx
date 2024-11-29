"use client";
import { NoPermissionView } from "@/app/(auth)/doctor/no-permission-view";
import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { DuChapters } from "./components/du-chapters/du-chapters";

export default function CourseItem() {
  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return <NoPermissionView />;
  }
  return (
    <div>
      <NavBar />

      <div className="mt-8 md:mx-12">
        <DuChapters />
      </div>

      <FloatingNavbar />
    </div>
  );
}
