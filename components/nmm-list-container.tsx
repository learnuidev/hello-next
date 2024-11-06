import { cn } from "@/lib/utils";

export const NmmListContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-12 my-4 md:mx-8",
        className
      )}
    >
      {children}
    </div>
  );
};
