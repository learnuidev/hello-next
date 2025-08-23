import { languages } from "@/app/next/features/phrase/languages";
import { useNewConvoStore } from "@/components/step";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const LanguageSelector = () => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  return (
    <div className="my-4">
      <Label className=" text-gray-500 mb-4 block">Language</Label>
      <Select
        defaultValue="characters-learned"
        value={newConvo?.lang}
        onValueChange={(value) => {
          setConvo("lang", value);
        }}
      >
        <SelectTrigger className="w-full h-12 bg-transparent dark:text-white dark:border-gray-800 px-2">
          <SelectValue placeholder="Select content type" className="" />
        </SelectTrigger>
        <SelectContent className="mx-0">
          <SelectItem value="not-selected">Not Selected</SelectItem>
          {languages.map((contentType) => {
            return (
              <SelectItem
                key={JSON.stringify(contentType)}
                value={contentType.shortId}
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
