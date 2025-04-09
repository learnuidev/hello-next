"use client";
import { useMemo } from "react";
import {
  AnalyticsIcon,
  CheckIcon,
  CloseIcon,
  GradeAIcon,
  GradeBIcon,
  GradeFIcon,
  Header,
} from "@/components/ui/icons";
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";

import {
  course,
  course2,
  course3,
  course4,
  course5,
  course6,
} from "./pronounciation_data";
import { useLessonHistoryStore } from "./useLessonHistory";
import { useViewModeStore } from "./useViewModeStore";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useSpeakStore } from "./useSpeakStore";

const columnHelper = createColumnHelper<any>();

function downloadObjectAsJson(exportObj: any, exportName: any) {
  console.log(exportObj);
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function timeSince(date: any) {
  var seconds = Math.floor(((new Date() as any) - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "mo";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m";
  }
  return Math.floor(seconds) + " seconds ago";
}

const calcOutcome = (
  lesson: any,
  confidence: any,
  answer: any,
  expectedAnswer: any
) => {
  const expAns = expectedAnswer
    .replace(", ", "")
    .replace("?", "")
    .split("")
    .filter(Boolean)
    .join("")
    .split(" ")
    .filter((item: any) => ![", ", "？", "，"].includes(item))
    .join("");

  console.log("ANS", answer);

  // if (
  //   answer !== expAns.trim() &&
  //   !lesson?.alternateAnswers?.includes(answer) &&
  //   !expAns.includes(answer)
  // ) {
  //   return <GradeFIcon />
  // }

  // return <GradeAIcon />

  if (
    answer !== expAns.trim() &&
    !lesson?.alternateAnswers?.includes(answer) &&
    !expAns.includes(answer)
  ) {
    return "fail";
  }

  return "success";
};

export const PronounciationAnalytics = ({
  lessonIndex,
}: // lessonId
{
  lessonIndex: number;
}) => {
  const lessonHistories = useLessonHistoryStore((state: any) => state.history);
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);
  // const lessonId = useCurrentLesson((state: any) => state.lessonId)

  const lessons = useSpeakStore((state: any) => state.lessons);
  const params = useParams();
  const lessonId = params?.speak_id;
  // const lessonId = params?.speak_id

  // alert(lessonId)

  console.log("IDX", lessonIndex);

  const course = lessons?.find((lesson: any) => lessonId == lesson?.id);

  const lesson = course?.lessons[lessonIndex] || null;
  console.log("LESSSSSON", lesson);
  console.log("HIST", lessonHistories);

  const calcConfidenceColor = (val: any, answer: any, expectedAnswer: any) => {
    const expAns = expectedAnswer
      .replace(", ", "")
      .replace("?", "")
      .split("")
      .filter(Boolean)
      .join("")
      .split(" ")
      .filter((item: any) => ![", ", "？", "，"].includes(item))
      .join("");

    console.log("ANS", answer);

    console.log("expAns", expAns);
    if (
      answer !== expAns.trim() &&
      !lesson?.alternateAnswers?.includes(answer) &&
      !expAns.includes(answer)
    ) {
      return "dark:text-red-300 text-red-500";
    }
    if (val > 70) {
      return "dark:text-green-300 text-green-500";
    }
    if (val < 70) {
      return "dark:text-yellow-300 text-yellow-500";
    }
    if (val < 60) {
      return "dark:text-orange-300 text-orange-600";
    }
  };

  console.log("LESSON HISTORIES", lessonHistories);

  console.log("LESSON ID", lessonId);

  const lessonHistory = useMemo(() => {
    return (lessonHistories || [])
      .filter((lessonHistory: any) => {
        return lessonHistory.lessonId == lesson?.id;
      })
      .map((res: any) => {
        const resp = {
          time: res?.time,
          transcript: res?.answer?.[0]?.transcript,
          confidence: res?.answer?.[0]?.confidence,
          outcome: calcOutcome(
            lesson,
            res?.answer?.[0]?.confidence * 100,
            res?.answer?.[0]?.transcript,
            lesson?.hanziV2
          ),
        };
        return resp;
        // return res?.answer
      });
  }, [lesson, lessonHistories]);

  const viewMode = useViewModeStore((state: any) => state.viewMode);

  const columns = [
    columnHelper.group({
      id: "initial",
      // header: () => <span className='my-2 mx-2.5 text-xs text-center'>actor</span>,
      // footer: props => props.column.id,
      columns: [
        columnHelper.accessor("time", {
          // cell: InfoRenderer,
          cell: (info) => {
            const val = info.getValue();

            return timeSince(val);
          },
          header: () => (
            <span className="my-2 mx-2.5 text-md text-center">time</span>
          ),
        }),
        columnHelper.accessor("transcript", {
          cell: (info) => {
            const val = info.getValue();

            return val;
          },
          header: () => (
            <span className="my-2 mx-2.5 text-md text-center">answer</span>
          ),
        }),
        columnHelper.accessor("confidence", {
          cell: (info) => {
            const val = info.getValue();
            return `${(val * 100).toFixed(2)} %`;
          },
          header: () => (
            <span className="my-2 mx-2.5 text-md text-center">confidence</span>
          ),
        }),
        columnHelper.accessor("outcome", {
          cell: (info) => {
            const val = info.getValue();
            switch (val) {
              case "success":
                return <CheckIcon />;
              case "fail":
                return <CloseIcon />;
              default:
                return <GradeFIcon />;
            }
          },
          header: () => (
            <span className="my-2 mx-2.5 text-md text-center">outcome</span>
          ),
        }),
      ],
    }),
  ];

  const table = useReactTable({
    data: lessonHistory || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("LESSON", lesson);

  if (!lessonHistory.length) {
    return (
      <div className="pt-44 text-center w-full">
        <p className="text-2xl font-extralight dark:text-gray-400">
          {" "}
          Nothing at the moment
        </p>

        <button
          className="text-3xl my-2 dark:text-gray-500"
          onClick={() => {
            setViewMode("lesson");
            //
            console.log("SHOW ANALYTICS");
          }}
        >
          <CloseIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col items-center">
      <div className="absolute top-0 py-8 w-full px-8">
        <div className="flex justify-between w-full grow">
          <div />
          <Header className="text-black dark:text-white text-xl md:text-3xl font-extrabold">
            {/* 分析 (analytics) */}
            {lesson?.hanzi}
          </Header>

          <div>
            <button
              className={`${
                viewMode === "analytics"
                  ? "dark:text-gray-200 text-gray-800"
                  : "dark:text-gray-600 text-gray-600"
              } text-4xl dark:hover:text-white shadow-md px-4 py-1 rounded-full`}
              onClick={() => {
                setViewMode("lesson");
              }}
            >
              <AnalyticsIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-44 md:px-16 text-sm dark:text-white">
        <button
          onClick={() => {
            downloadObjectAsJson(lessonHistory, `history_${lesson.id}`);
          }}
          className="dark:text-white mb-2"
        >
          {" "}
          Download{" "}
        </button>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-gray-700 dark:text-gray-400"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const val = cell.getValue() as any;

                    console.log("CELL", cell);

                    if (cell.id?.includes("outcome")) {
                      const res = cell?.row?.original;
                      return (
                        <td
                          onClick={() => {
                            // setSelectedPinyin(cell.getValue())
                            console.log(cell.getValue());
                          }}
                          role="button"
                          key={cell.id}
                          // className={`text-2xl `}
                          className={`bg-gray-200 dark:bg-gray-900  px-8 py-4 md:px-12 font-extralight hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-white hover:text-gray-800 transition ${calcConfidenceColor(
                            res.confidence * 100,
                            res.transcript,
                            lesson?.hanziV2
                          )}`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    }

                    // console.log('ROW', row)
                    // const char = characterDictionary[val?.value || val]
                    return (
                      <td
                        onClick={() => {
                          // setSelectedPinyin(cell.getValue())
                          console.log(cell.getValue());
                        }}
                        role="button"
                        key={cell.id}
                        className={`px-8 py-4 md:px-12 font-extralight hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-white hover:text-gray-800 ${
                          true
                            ? "bg-gray-200 dark:bg-gray-900 dark:text-white text-gray-800"
                            : "dark:text-gray-400 text-white"
                        } transition`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </div>
  );
};
