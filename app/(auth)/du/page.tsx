"use client";
import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { NoPermissionView } from "../../../components/no-permission-view";

import { useSearchQueryStore } from "@/components/search/state";
import { DuCategoryList } from "./components/du-category-list/du-category-list";
import { DuCourses } from "./components/du-courses/du-courses";
import { DuFavouriteList } from "./components/du-favourite-list/du-favourite-list";
import { DuLevelSelector } from "./components/du-level-selector/du-level-selector";
import { DuSearchResults } from "./components/du-search-results/du-search-results";
import { WithVerifiedDuUser } from "./components/with-verified-du-user";
import { useGetDuParams } from "./hooks/use-get-du-params";

function DuView() {
  const { view, category } = useGetDuParams();
  const query = useSearchQueryStore((state) => state.query2);

  if (category) {
    return <DuCategoryList />;
  }

  if (view) {
    return <DuFavouriteList />;
  }

  if (query) {
    return <DuSearchResults />;
  }

  return <DuCourses />;
}

export default function DuChinse() {
  const isSuperAdmin = useIsSuperAdmin();
  const { view } = useGetDuParams();

  if (!isSuperAdmin) {
    return <NoPermissionView />;
  }

  return (
    <WithVerifiedDuUser>
      <div>
        <div>
          <NavBar />
        </div>

        <div className="mt-8 mx-4 md:mx-12 mb-32">
          {view !== "favourite" && <DuLevelSelector />}
          <DuView />
        </div>

        <FloatingNavbar />
      </div>
    </WithVerifiedDuUser>
  );
}
