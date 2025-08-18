import { useNewConvoStore } from "@/components/step";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contentTypes } from "../../constants/content-types";

export const ContentTypeSelector = () => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  return (
    <div className="my-4">
      <Label className=" text-gray-500 mb-4 block">Content Type</Label>
      <Select
        defaultValue="characters-learned"
        value={newConvo?.contentType}
        onValueChange={(value) => {
          setConvo("contentType", value);
        }}
      >
        <SelectTrigger className="sm:w-4/12 w-full h-12 bg-transparent dark:text-white dark:border-gray-800 px-2">
          <SelectValue placeholder="Select content type" className="" />
        </SelectTrigger>
        <SelectContent className="mx-0">
          <SelectItem value="not-selected">Not Selected</SelectItem>
          {contentTypes.map((contentType) => {
            return (
              <SelectItem
                key={JSON.stringify(contentType)}
                value={contentType.id}
              >
                {contentType.title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
