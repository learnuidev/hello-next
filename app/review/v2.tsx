import { NavBar } from "@/components/navbar";
import { Icons } from "@/components/ui/icons.v2";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReviewList } from "./review-list";
import { ReviewItem } from "./review-item";

export const ReviewV2 = () => {
  const searchParams = useSearchParams();

  const reviewId = searchParams.get("input") || "";
  const lang = searchParams.get("lang") || "";
  const date = searchParams.get("date") || "";

  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant: "all" });

  const isSelected = (reviewId && lang) || date;

  const filteredGroups = isSelected
    ? groups?.filter((group) =>
        group?.items?.find(
          (item: any) =>
            [item?.hanzi, item?.input]?.includes(reviewId) &&
            item?.status === "needs_review"
        )
      )
    : groups;

  const groupItems = filteredGroups?.map((group) => group.items)?.flat();

  return (
    <main>
      <NavBar />

      <section className="flex justify-between items-center w-full px-4 md:px-12 md:my-4">
        {isSelected && (
          <div className="flex">
            <Link href="/review">
              <Icons.xMark />
            </Link>
          </div>
        )}
      </section>

      {isSelected ? <ReviewItem /> : <ReviewList />}
    </main>
  );
};
