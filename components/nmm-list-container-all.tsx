import { cn } from "@/lib/utils";
import { useIsSmall } from "./youtube-page/utils/use-is-small";
import { NmmListContainer } from "./nmm-list-container";
import { useGetDimensions } from "./youtube-page/utils/use-get-dimensions";

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
      <>
        <NmmListContainer className={className}>{children}</NmmListContainer>
      </>
    );
  }

  return (
    <>
      <div
        className={cn(
          "my-4 text-black dark:text-white flex flex-wrap pt-12",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
