import { Icons } from "@/components/ui/icons.v2";
import { useReviewModeView } from "../use-review-mode";

export function ReviewCloze() {
  const { setReviewMode } = useReviewModeView();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            setReviewMode(null);
          }}
        >
          <Icons.xMark />
        </button>
        <h1 className="text-center">Review Cloze</h1>
        <div></div>
      </div>
    </div>
  );
}
