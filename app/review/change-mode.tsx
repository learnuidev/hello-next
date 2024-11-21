import Link from "next/link";
import { belts } from "../nmm/utils";
import { useGetReviewParams } from "./use-get-review-params";

export const ChangeMode = () => {
  const { mode, reviewMode } = useGetReviewParams();

  const levelBelts = mode === "hsk" ? belts?.slice(0, 6) : belts;
  return (
    <div className="mt-8 mb-16 px-4 md:px-16">
      <section>
        <h1 className="text-center text-2xl mb-16">
          {" "}
          Change <span className="uppercase">{mode}</span> Level{" "}
        </h1>

        <div className="flex space-x-12 justify-center items-center">
          {levelBelts.map((belt) => {
            return (
              <Link
                className="text-4xl dark:text-gray-400 text-gray-600 hover:text-gray-900 hover:dark:text-white font-light"
                href={`/review?mode=${mode}&level=${belt.hskLevel}${reviewMode ? `&review-mode=${reviewMode}` : ``}`}
                key={JSON.stringify(belt)}
              >
                {belt.hskLevel}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
