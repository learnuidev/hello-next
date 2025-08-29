"use client";

import { useShowsStore } from "../../word-item";

import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import Link from "next/link";

import { usePaginationStore } from "@/stores/use-pagination-store";
import { useReadModeStore } from "@/stores/use-readmode-store";

import { useBrightModeStore } from "../../settings-dialog/use-bright-mode-store";
import { useCanTrackFunction } from "@/components/use-can-track-function";

function SentenceViewItem({ prop }: { prop: any }) {
  const brightMode = useBrightModeStore((state) => state.mode);

  const shows = useShowsStore((state) => state.shows) as any;
  const setShows = useShowsStore((state) => state.setShows) as any;
  const readMode = useReadModeStore((state) => state.readMode);

  const addHistoryMutation = useAddHistoryMutation();

  const show = shows?.[prop?.hanzi];

  const setShow = (show: boolean) => {
    setShows({ ...shows, [prop?.hanzi]: show });
  };

  const { trackFunction } = useCanTrackFunction(prop, {
    lang: prop?.lang,
  });

  return (
    <Link
      href={`/nmm/${prop?.input || prop?.hanzi}?lang=${prop?.lang}`}
      key={JSON.stringify(prop)}
      className="font-extralight text-xl"
      onClick={() => {
        trackFunction();
        // if (!addHistoryMutation?.isLoading) {
        //   addHistoryMutation.mutate({
        //     // pathName: routeName,
        //     hanzi: prop?.input || prop?.hanzi,
        //     lang: prop?.lang || lang,
        //     query: query,
        //     contentId: prop?.id,
        //     eventType: "CONTENT_VIEWED",
        //   } as any);
        // }
      }}
    >
      {readMode ? (
        <p className="text-gray-400 text-sm fade-in-100 transition">
          {prop?.pinyin || prop?.roman}
        </p>
      ) : (
        <p className="text-black text-sm"></p>
      )}
      <p
        onClick={() => {
          setShow(!!show);
        }}
        onMouseEnter={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
      >
        {prop?.hanzi}
      </p>
      {brightMode || show || readMode ? (
        <p className="text-gray-500 text-sm transition fade-in-100">
          {prop?.en}
        </p>
      ) : (
        <p className="text-black text-sm">{prop?.en}</p>
      )}
    </Link>
  );
}

export const SentencesViewV2 = ({
  relatedSentences,
}: {
  relatedSentences: any;
}) => {
  const brightMode = useBrightModeStore((state) => state.mode);

  const pagination = usePaginationStore((state) => state.pagination);
  const setPagination = usePaginationStore((state) => state.setPagination);

  const shows = useShowsStore((state) => state.shows) as any;
  const setShows = useShowsStore((state) => state.setShows) as any;
  const readMode = useReadModeStore((state) => state.readMode);

  const addHistoryMutation = useAddHistoryMutation();

  const totalSentencs = Math.ceil(relatedSentences?.length / 10);

  const options = Array(totalSentencs)
    .fill(1)
    .map((val, idx) => {
      return {
        start: idx === 0 ? idx : idx * 10,
        end: (1 + idx) * 10,
      };
    });

  const sliced = relatedSentences?.slice(
    pagination?.start || 0,
    pagination?.end || 10
  );

  return (
    <div>
      <div className="flex justify-center mt-8">
        {options?.map((option) => {
          return (
            <button
              key={JSON.stringify(option)}
              onClick={() => {
                setPagination(option);
              }}
              className={`mx-4 my-2 text-xl dark:hover:text-white font-extralight text-black`}
            >
              <div
                className={`${
                  pagination?.start === option?.start
                    ? "text-slate-300 dark:text-slate-900 bg-slate-200 hover:bg-white"
                    : "text-slate-900 bg-slate-500 hover:bg-white"
                } h-2 w-2 rounded-full transition`}
              ></div>
            </button>
          );
        })}
      </div>

      {sliced?.length > 5 ? (
        <div className="mt-12 text-black dark:text-white gap-8 grid grid-cols-1 sm:grid-cols-3">
          {sliced?.map((prop: any) => {
            const show = shows?.[prop?.hanzi];

            const setShow = (show: boolean) => {
              setShows({ ...shows, [prop?.hanzi]: show });
            };

            return <SentenceViewItem prop={prop} key={JSON.stringify(prop)} />;
          })}
        </div>
      ) : (
        <div className="mt-12 text-black dark:text-white gap-8 grid grid-cols-1 mx-0 md:mx-36">
          {sliced?.map((prop: any) => {
            const show = shows?.[prop?.hanzi];

            const setShow = (show: boolean) => {
              setShows({ ...shows, [prop?.hanzi]: show });
            };

            return <SentenceViewItem prop={prop} key={JSON.stringify(prop)} />;
          })}
        </div>
      )}
    </div>
  );
};
