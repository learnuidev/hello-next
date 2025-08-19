import { useNewConvoStore } from "@/components/step";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetVideoByIdQuery } from "@/domain/youtube/get-video-by-id";

export const YoutubeInput = () => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  const { data: youtubeVideoDetails } = useGetVideoByIdQuery(newConvo?.audio);

  return (
    <div className="my-8">
      <Label className=" text-gray-500 mb-4 block">Youtube Url</Label>
      <Input
        value={newConvo?.audio}
        onChange={(event) => {
          setConvo("audio", event?.target?.value);
        }}
        onKeyDown={(event) => {
          if (event?.keyCode === 13) {
            if (newConvo.audio) {
              setConvo("mediaUrl", newConvo?.audio);
            }
          }
        }}
        placeholder="Youtube URL or ID"
        className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
      />
    </div>
  );
};
