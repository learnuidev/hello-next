import { useListFavouriteContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-favourited-contents-query copy";
import { useToggleFavouriteContentMutation } from "@/app/(auth)/convos/[content-id]/hooks/use-toggle-favourite-content-mutation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Icons } from "./ui/icons.v2";
import { useToast } from "@/hooks/use-toast";

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
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      {items.map((item, idx) => {
        const isFavourited = favouriteContents?.items?.find(
          (content: any) => content?.id === item.id
        );

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
            <Card>
              <div className="flex justify-between items-center">
                <Link href={item?.link}>
                  <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                </Link>
                <p>
                  {" "}
                  <span>{item?.icon && <item.icon className="text-xl" />}</span>
                </p>
              </div>

              <CardDescription className="flex justify-between dark:text-gray-500">
                <p className="line-clamp-3">
                  {" "}
                  {item.description || item?.subtopic}{" "}
                </p>
                <p>{item?.lang}</p>

                <button
                  disabled={toggleFavouritContentMutation.isLoading}
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
              </CardDescription>
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
        <div className="p-4">{children}</div>
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
    <h4
      className={cn(
        "dark:text-zinc-100 font-bold tracking-wide mt-4",
        className
      )}
    >
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
