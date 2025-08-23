import { useNewConvoStore } from "@/components/step";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ContentTitleInput = () => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  return (
    <div className="my-8">
      <Label className=" text-gray-500 mb-4 block">Content Title</Label>
      <Input
        value={newConvo.title}
        onChange={(event) => {
          setConvo("title", event?.target?.value);
        }}
        placeholder="Content Title"
        className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
      />
    </div>
  );
};
