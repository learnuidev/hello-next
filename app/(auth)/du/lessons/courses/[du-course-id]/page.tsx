"use client";
import { NoPermissionView } from "@/app/(auth)/doctor/no-permission-view";
import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { DuChapters } from "./components/du-chapters/du-chapters";
import { WithVerifiedDuUser } from "../../../components/with-verified-du-user";

export default function CourseItem() {
  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return <NoPermissionView />;
  }

  return (
    <WithVerifiedDuUser>
      <div className="w-full">
        <NavBar />

        <div className="mx-4 mt-8 md:mx-12">
          <DuChapters />
        </div>

        <FloatingNavbar />
      </div>
    </WithVerifiedDuUser>
  );
}
