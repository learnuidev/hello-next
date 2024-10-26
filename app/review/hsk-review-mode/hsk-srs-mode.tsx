import { useGetHskWords } from "@/app/nmm/hsk/use-get-hsk-words";
import { useGetReviewUrl } from "@/components/settings-dialog/use-get-review-url";
import { useRouter } from "next/navigation";
import { SelectHskReviewMode } from "./select-hsk-review-mode";

export const HskSRSMode = () => {
  const hskWords = useGetHskWords({});

  const router = useRouter();

  const reviewUrl = useGetReviewUrl();

  return (
    <main>
      <h1 className="text-center mt-64 text-7xl font-bold">HSK SRS Mode</h1>

      <div>
        <code>
          <pre>{JSON.stringify(hskWords, null, 2)}</pre>
        </code>
      </div>
    </main>
  );
};
