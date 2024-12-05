import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Icons } from "@/components/ui/icons.v2";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useGetDuParams } from "../../../hooks/use-get-du-params";
import { useListChapters } from "../../courses/[du-course-id]/hooks/use-list-chapters";
import { useListLessons } from "../../../hooks/use-list-lessons";
import { useGetChapterDetails } from "../hooks/use-get-chapter-details";

export function DuRecommendationsDrawer({
  courseId: _courseId,
  disabled,
  chapterId,
}: {
  courseId: string;
  disabled?: boolean;
  chapterId: string;
}) {
  const duParams = useGetDuParams();

  const { cookie } = duParams;

  const { data, isLoading } = useGetChapterDetails({
    chapterId,
    courseId: _courseId,
    cookie: cookie,
  });

  const { data: lessonsList } = useListLessons({
    levels: [data?.level || ""]?.filter(Boolean) || [],
    hideStudied: true,
    cookie,
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button disabled={disabled}>
          <Icons.layerGroup
            className={cn(
              "sm:text-2xl text-2xl text-gray-400 hover:text-white",
              disabled ? "text-gray-800" : ""
            )}
          />
        </button>
      </DrawerTrigger>
      <DrawerContent className="border-gray-800">
        <div className="mx-auto w-full px-4 sm:px-16">
          <DrawerHeader className="pb-0 mb-0">
            <DrawerTitle className="text-center">Recommendations</DrawerTitle>
          </DrawerHeader>

          <ScrollArea className="space-y-6 w-full h-[600px] rounded-md mb-20">
            <div className="mt-4 grid grid-cols-4 mb-32 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-10 gap-4 gap-y-4 lg:gap-8">
              {lessonsList?.lessons?.map((item, idx) => {
                //   const item = val?.document;
                return (
                  <div
                    key={JSON.stringify(item)}
                    className="block col-span-2 lg:col-span-2"
                  >
                    <Link href={`/du/${item?.path}`} className="block">
                      <img
                        className="object-cover rounded-xl w-full"
                        src={item?.large_image_url}
                        alt={item?.title}
                      />
                    </Link>

                    <div className="mt-2 flex justify-between items-center w-full">
                      <div>
                        <p className="truncate text-sm w-full">
                          {item?.title?.length > 30
                            ? `${item?.title?.slice(0, 30)}...`
                            : item?.title}
                        </p>
                        <p className="font-light text-gray-400 text-xs sm:text-sm capitalize">
                          {" "}
                          <span>{item?.level}</span>
                        </p>
                      </div>

                      {item?.status === "not_started" ? (
                        <Icons.questionMark className="sm:text-2xl text-lg" />
                      ) : (
                        <Icons.badgeCheck className="text-rose-400 sm:text-2xl text-lg" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
