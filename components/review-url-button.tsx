import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons.v2";

import Link from "next/link";

import { usePathname, useSearchParams } from "next/navigation";

import { useReviewModeView } from "@/app/review/use-review-mode";
import { useGetReviewUrl } from "./settings-dialog/use-get-review-url";

import { usePreviousPathnameStore } from "./language-selector/use-previous-path-name-store";

export const ReviewUrlButton = ({
  contentId,
  className,
  children,
}: {
  contentId: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  const routeName = usePathname();
  const reviewUrl = useGetReviewUrl();

  const { reviewMode: _reviewMode } = useReviewModeView();

  const pathName = usePathname();

  const { setPreviousPath } = usePreviousPathnameStore();

  const searchParams = useSearchParams();

  return (
    <Link
      href={reviewUrl.reviewUrl}
      target="_blank"
      onClick={() => {
        setPreviousPath(`${pathName}?start=${searchParams.get("start") || 0}`);
      }}
      className={cn("transition", className)}
    >
      {children ? (
        children
      ) : (
        <Icons.playCircle className="hover:text-rose-400 dark:hover:text-white transition" />
      )}
    </Link>
  );
};
