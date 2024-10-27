import { useGetHskWords } from "@/app/nmm/hsk/use-get-hsk-words";
import { useGetReviewUrl } from "@/components/settings-dialog/use-get-review-url";
import { Icons } from "@/components/ui/icons.v2";
import { useRouter } from "next/navigation";
// import { useGetReviewUrl } from "@/components/settings-dialog/use-get-review-url";
// import { useRouter } from "next/navigation";

export const HskExamMode = () => {
  const hskWords = useGetHskWords({});

  const router = useRouter();

  const reviewUrl = useGetReviewUrl();

  return (
    <main>
      <h1 className="text-center mt-48 md:mt-64 text-5xl md:text-7xl font-bold">
        HSK iExam Mode
      </h1>

      <div className="flex items-center justify-center flex-row text-lg md:text-2xl space-x-2 mt-2 mb-8 text-gray-400">
        <Icons.construction />

        <p className="text-center font-extralight">Coming Soon</p>
      </div>

      <div className="flex items-center justify-center space-x-4 mt-8">
        <button
          onClick={() => {
            router.push(`${reviewUrl}`);
          }}
          className="dark:boder-gray-200 border-[1px] px-4 py-2 rounded-full"
        >
          Back to Menu
        </button>
      </div>
    </main>
  );
};
