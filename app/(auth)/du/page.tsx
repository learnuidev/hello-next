"use client";
import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { NoPermissionView } from "../doctor/no-permission-view";

import { DuCourses } from "./components/du-courses/du-courses";
import { DuLevelSelector } from "./components/du-level-selector/du-level-selector";
import { WithVerifiedUser } from "./components/with-verified-user";
import { useSearchQueryStore } from "@/components/search/state";
import { DuSearchResults } from "./components/du-search-results/du-search-results";

export default function DuChinse() {
  const isSuperAdmin = useIsSuperAdmin();

  const query = useSearchQueryStore((state) => state.query2);

  if (!isSuperAdmin) {
    return <NoPermissionView />;
  }

  return (
    <WithVerifiedUser>
      <div>
        <NavBar />

        <div className="mt-8 md:mx-12 mb-32">
          <DuLevelSelector />
          {query ? <DuSearchResults /> : <DuCourses />}
        </div>

        <FloatingNavbar />
      </div>
    </WithVerifiedUser>
  );
}
