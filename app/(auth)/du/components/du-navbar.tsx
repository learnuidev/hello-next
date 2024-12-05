import { cn } from "@/lib/utils";

import { FilterSelect } from "@/app/nmm/filter-select";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { duCategories } from "../constants/du-categories";
import { useGetDuParams } from "../hooks/use-get-du-params";

export const DuNavbar = () => {
  const { view, category } = useGetDuParams();

  const router = useRouter();

  const isFavourite = view === "favourite";

  const items = Object.values(duCategories);

  const isGlobal = !view && !category;

  return (
    <div
      className={cn(
        "transition",
        "flex items-center w-full justify-center space-x-8"
      )}
    >
      <Link
        href={"/du"}
        className={cn("text-xl", isGlobal ? "text-white" : "text-gray-600")}
      >
        <Icons.globeAsia />
      </Link>

      <Link
        href={isFavourite ? "/du" : "/du?view=favourite"}
        className={cn("text-xl", isFavourite ? "text-white" : "text-gray-600")}
      >
        {isFavourite ? <Icons.bookmarkSolid /> : <Icons.bookmark />}
      </Link>

      <FilterSelect
        value={category || ""}
        onValueChange={(category) => {
          router.push(`/du?category=${category}`);
        }}
        className="w-[320px]"
        items={Object.values(duCategories)}
        title="Select a category"
      />
    </div>
  );
};
