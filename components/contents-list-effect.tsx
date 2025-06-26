import { useListFavouriteContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-favourited-contents-query";
import { useToggleFavouriteContentMutation } from "@/app/(auth)/convos/[content-id]/hooks/use-toggle-favourite-content-mutation";
import { useRecentlyWatchedContent } from "@/app/(auth)/convos/use-recently-watched-content-store";
import { useGetUserPreferenceQuery } from "@/domain/user/use-get-user-preference-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icons } from "./ui/icons.v2";

export const ContentsListEffect = ({
  items,
  className,
}: {
  items: {
    id: string;
    icon?: any;
    title: string;
    description: string;
    link: string;
    subtopic?: string;
    lang?: string;
    audio?: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { setRecentlyWatched } = useRecentlyWatchedContent();

  const { data: userPreferences } = useGetUserPreferenceQuery();

  const recentlyWatched = userPreferences?.recentlyWatched || {};

  const { toast } = useToast();

  const toggleFavouritContentMutation = useToggleFavouriteContentMutation();

  const { data: favouriteContents, isLoading: isFavouriteContentLoading } =
    useListFavouriteContentsQuery({});

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item: any, idx) => {
        const isFavourited = favouriteContents?.items?.find(
          (content: any) => content?.id === item.id
        );

        const totalWatched = (recentlyWatched?.[item?.id] as any)?.totalWatched;

        console.log("recently watched", recentlyWatched);

        return (
          <div
            // href={item?.link}
            key={item?.link}
            className="relative group  block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card className="py-4 px-2">
              <div className="flex justify-between items-center gap-4">
                <Link
                  href={item?.link}
                  onClick={() => {
                    setRecentlyWatched(item);
                  }}
                >
                  <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                </Link>
                <button
                  disabled={toggleFavouritContentMutation.isPending}
                  className="text-xl"
                  onClick={() => {
                    if (isFavourited) {
                      toggleFavouritContentMutation
                        .mutateAsync({
                          type: "unfavourite",
                          contentId: item?.id,
                        })
                        .then(() => {
                          toast({
                            title: "Success",
                            description: "Content successfully unfavourited",
                          });
                        });
                    } else {
                      toggleFavouritContentMutation
                        .mutateAsync({
                          type: "favourite",
                          contentId: item?.id,
                        })
                        .then(() => {
                          toast({
                            title: "Success",
                            description: "Content successfully favourited",
                          });
                        });
                    }
                  }}
                >
                  {isFavourited ? <Icons.heartSolid /> : <Icons.heart />}
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2 text-gray-400">
                <p>
                  {totalWatched || 0} {totalWatched > 1 ? "views" : "view"}
                </p>
              </div>

              <Link
                href={item?.link}
                onClick={() => {
                  // updateUserPreferenceMutation?.mutate({
                  //   recentlyWatched: {
                  //     ...userPreferences?.recentlyWatched,
                  //     [item?.id]: {
                  //       watchedAt: Date.now(),
                  //       id: item?.id,
                  //       title: item?.title,
                  //       audio: item?.audio,
                  //     },
                  //   },
                  // });
                  setRecentlyWatched(item);
                }}
              >
                <CardDescription className="flex justify-between dark:text-gray-500 flex-1 flex-grow">
                  <p className="line-clamp-2">
                    {" "}
                    {item.description || item?.subtopic}{" "}
                  </p>
                  <p>{item?.lang}</p>
                </CardDescription>
              </Link>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden dark:bg-black bg-gray-100 border border-transparent dark:border-white/[0.2] dark:group-hover:border-slate-700 group-hover:border-slate-300 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="px-4 pt-4 pb-2">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("dark:text-zinc-100 font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
