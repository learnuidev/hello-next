import { useGetReviewUrl } from "@/components/settings-dialog/use-get-review-url";
import { useRouter } from "next/navigation";

export const SelectHskReviewMode = () => {
  const router = useRouter();

  const reviewUrl = useGetReviewUrl();

  return (
    <main>
      <h1 className="text-center mt-48 md:mt-64 text-5xl md:text-7xl font-bold">
        HSK Review Mode
      </h1>

      <p className="text-center text-lg md:text-2xl font-extralight mt-2 mb-8 text-gray-400">
        Please select one of the following
      </p>

      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => {
            router.push(`${reviewUrl}&study-mode=srs`);
          }}
          className="dark:boder-gray-200 border-[1px] px-4 py-2 rounded-full"
        >
          SRS Mode
        </button>
        <button
          onClick={() => {
            router.push(`${reviewUrl}&study-mode=exam`);
          }}
          className="dark:boder-gray-200 border-[1px] px-4 py-2 rounded-full"
        >
          HSK Exam Mode
        </button>
      </div>
    </main>
  );
};
