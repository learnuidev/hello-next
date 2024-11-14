import { cn } from "@/lib/utils";

export const NmmListContainerAll = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start",
        className
      )}
    >
      {children}
    </div>
  );
};
