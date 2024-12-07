"use client";
import { NoPermissionView } from "@/app/(auth)/doctor/no-permission-view";
import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { WithVerifiedDuUser } from "../../components/with-verified-du-user";
import { DuLessonView } from "./components/du-chapter-view";

export default function LessonItem() {
  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return <NoPermissionView />;
  }
  return (
    <WithVerifiedDuUser>
      <div>
        <NavBar />

        <div>
          <DuLessonView />
        </div>

        <FloatingNavbar />
      </div>
    </WithVerifiedDuUser>
  );
}
