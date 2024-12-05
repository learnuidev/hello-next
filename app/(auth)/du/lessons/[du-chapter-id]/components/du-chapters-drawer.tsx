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
}: {
  courseId: string;
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
        <button>
          <Icons.layerGroup
            className={cn(
              "sm:text-2xl text-2xl text-gray-400 hover:text-white"
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
              {data?.lessons?.map((item, idx) => {
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

                    <div className="mt-2 flex justify-between items-center">
                      <div>
                        <p className="truncate">
                          {" "}
                          <span>
                            {item?.title === course?.title
                              ? `Chapter ${idx + 1}`
                              : item?.title}
                          </span>
                        </p>
                        <p className="font-light text-gray-400 text-sm capitalize">
                          {" "}
                          <span>{item?.level}</span>
                        </p>
                      </div>

                      {lesson?.status === "not_started" ? (
                        <Icons.questionMark className="text-2xl" />
                      ) : (
                        <Icons.badgeCheck className="text-rose-400 text-2xl" />
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
