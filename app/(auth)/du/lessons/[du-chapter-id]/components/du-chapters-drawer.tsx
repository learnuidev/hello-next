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

export function DuChaptersDrawer({
  courseId: _courseId,
  disabled,
}: {
  courseId: string;
  disabled?: boolean;
}) {
  const duParams = useGetDuParams();

  const { cookie } = duParams;

  const courseId = _courseId || duParams.courseId;

  const { data } = useListChapters({
    courseId,
    cookie,
  });

  const lesson = data?.lessons?.[0];

  const course = lesson?.course;

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
            <DrawerTitle className="text-center">Select a chapter</DrawerTitle>
          </DrawerHeader>

          <ScrollArea className="space-y-6 w-full h-[600px] rounded-md mb-20">
            <div className="mt-4 grid grid-cols-4 mb-32 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-10 gap-4 gap-y-4 lg:gap-8">
              {data?.lessons?.map((lesson, idx) => {
                return (
                  <div
                    key={JSON.stringify(lesson?.id)}
                    className="block col-span-2 lg:col-span-2"
                  >
                    <Link href={`/du/${lesson?.path}`} className="block">
                      <img
                        className="object-cover rounded-xl w-full"
                        src={lesson?.large_image_url}
                        alt={lesson?.title}
                      />
                    </Link>

                    <div className="mt-2 flex justify-between lessons-center">
                      <div>
                        <p className="truncate text-sm">
                          {" "}
                          <span>
                            {lesson?.title === course?.title
                              ? `Chapter ${idx + 1}`
                              : lesson?.title?.length > 33
                                ? `${lesson?.title?.slice(0, 30)}...`
                                : lesson?.title}
                          </span>
                        </p>
                        <p className="font-light text-gray-400 text-xs sm:text-sm capitalize">
                          {" "}
                          <span>{lesson?.level}</span>
                        </p>
                      </div>

                      {lesson?.status === "not_started" ? (
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
