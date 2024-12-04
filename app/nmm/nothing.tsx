import { Icons } from "@/components/ui/icons.v2";

export const Nothing = ({
  message,
  icon,
}: {
  message?: string;
  icon?: any;
}) => {
  const Icon = icon ? icon : Icons.partySolid;
  const defaultMessage = message || "Nothing here";

  return (
    <div className="text-center my-32 text-3xl">
      <Icon className={"text-4xl mb-2"} />
      <h2 className="font-extralight">{defaultMessage}</h2>
    </div>
  );
};
