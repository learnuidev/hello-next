import { cn } from "@/lib/utils";
import { useIsSmall } from "./youtube-page/utils/use-is-small";
import { NmmListContainer } from "./nmm-list-container";

export const NmmListContainerAll = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isSmall = useIsSmall();

  if (isSmall) {
    return (
      <NmmListContainer className={className}>{children}</NmmListContainer>
    );
  }

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
