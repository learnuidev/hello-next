import { Icons } from "@/components/ui/icons.v2";

export const Nothing = ({ message }: { message?: string }) => {
  return (
    <div className="text-center my-32 text-3xl">
      <Icons.partySolid className="text-4xl mb-2" />
      <h2 className="font-extralight">{message || "Nothing here"}</h2>
    </div>
  );
};
