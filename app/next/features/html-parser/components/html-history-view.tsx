import { Nothing } from "@/app/nmm/nothing";
import { useHtmlHistoryStore } from "../hooks/use-html-history-store";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { formatJournalDate } from "@/app/(auth)/diary/utils/format-journal-date";
import { useFeatureContext } from "../../feature-context-provider";

export const HtmlHistoryView = ({
  hideClearAll,
}: {
  hideClearAll?: boolean;
}) => {
  const _history = useHtmlHistoryStore((state) => state.history);
  const clearHistory = useHtmlHistoryStore((state) => state.clearHistory);
  const removeHistory = useHtmlHistoryStore((state) => state.removeHistory);

  const { rootUrl } = useFeatureContext();

  const history = _history?.sort(
    (a: any, b: any) => b?.historyAddedAt - a?.historyAddedAt
  );

  if (!history?.length) {
    return <Nothing icon={Icons.verticalStackSolid} message="Nothing here" />;
  }
  return (
    <div className="px-4 sm:px-32">
      {hideClearAll ? null : (
        <div className="my-12">
          <button
            onDoubleClick={() => {
              clearHistory();
            }}
          >
            Clear All
          </button>
        </div>
      )}
      <section>
        <div className="mt-12 grid grid-cols-2 mb-32 md:grid-cols-4 lg:grid-cols-10 gap-4 gap-y-4 lg:gap-8">
          {history?.map((lesson: any, idx) => {
            return (
              <div
                key={JSON.stringify(lesson?.id)}
                className="block h-36 p-4 col-span-2 lg:col-span-2 shadow-2 shadow-sm shadow-gray-600"
              >
                <Link
                  href={`${rootUrl}?feature-id=html-parser&url=${lesson?.url}&view=default`}
                  className="flex justify-between lessons-center"
                >
                  <div>
                    <p className="truncate text-sm">
                      {" "}
                      <span>{lesson?.data?.title}</span>
                    </p>
                  </div>
                </Link>

                <p className="mt-2 font-light text-gray-400 text-sm truncate capitalize">
                  {" "}
                  {formatJournalDate(lesson?.historyAddedAt)}
                </p>

                <p className="font-extralight text-sm text-gray-600">
                  <span>{lesson?.sourceId}</span>
                </p>

                <div className="mt-8 flex justify-between w-full items-center">
                  <div className="flex items-center space-x-4">
                    {/* <p className="font-extralight text-sm text-gray-300">
                      <span>{lesson?.sourceId}</span>
                    </p> */}

                    <p className="text-gray-400 text-xs space-x-[2px]">
                      <Icons.eye /> <span>{lesson?.totalViewed || 1}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      removeHistory(lesson?.id);
                    }}
                    className="text-gray-500 hover:text-white"
                  >
                    <Icons.trash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* <code>
          <pre>{JSON.stringify(history, null, 4)}</pre>
        </code> */}
      </section>
    </div>
  );
};
