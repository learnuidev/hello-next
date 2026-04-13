import { cn } from "@/lib/utils";

import Link from "next/link";

import { usePathname, useSearchParams } from "next/navigation";

import { useReviewModeView } from "@/app/review/use-review-mode";

import { usePreviousPathnameStore } from "../language-selector/use-previous-path-name-store";
import { useGetReviewUrl } from "../settings-dialog/use-get-review-url";
import { Icons } from "../ui/icons.v2";

export const ContentReviewButton = () => {
  const routeName = usePathname();
  const { reviewUrl } = useGetReviewUrl();

  const { reviewMode: _reviewMode } = useReviewModeView();

  const pathName = usePathname();

  const { setPreviousPath } = usePreviousPathnameStore();

  const searchParams = useSearchParams();

  return (
    <Link
      href={reviewUrl}
      target="_blank"
      onClick={() => {
        setPreviousPath(`${pathName}?start=${searchParams.get("start") || 0}`);
      }}
      className={cn(
        routeName?.includes("/review")
          ? "text-gray-800 dark:text-gray-300"
          : "text-gray-500 dark:text-gray-500",
        "transition text-xl ",
      )}
    >
      <Icons.playCircle className="hover:text-rose-400 dark:hover:text-white transition" />
    </Link>
  );
};
