"use client";
import { NoPermissionView } from "@/app/(auth)/doctor/no-permission-view";
import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useGetDuParams } from "../../hooks/use-get-du-params";
import { DuLessonView } from "./components/du-chapter-view";
import { WithVerifiedUser } from "../../components/with-verified-user";
// import { DuChapters } from "./components/du-chapters/du-chapters";

export default function LessonItem() {
  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return <NoPermissionView />;
  }
  return (
    <WithVerifiedUser>
      <div>
        <NavBar />

        <div>
          <DuLessonView />
        </div>

        <FloatingNavbar />
      </div>
    </WithVerifiedUser>
  );
}
