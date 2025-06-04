import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

export const Nothing = ({
  message,
  icon,
  className,
  children,
}: {
  message?: string;
  icon?: any;
  className?: string;
  children?: React.ReactNode;
}) => {
  const Icon = icon ? icon : Icons.spaceStation;
  const defaultMessage = message || "Nothing here";

  return (
    <div className={cn("text-center my-32", className)}>
      <Icon className={"text-4xl mb-4"} />
      <h2 className="font-extralight text-xl sm:text-3xl mt-4 text-gray-400">
        {defaultMessage}
      </h2>
      {children}
    </div>
  );
};
