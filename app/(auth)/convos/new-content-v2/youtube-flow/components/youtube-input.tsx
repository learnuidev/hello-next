import { useNewConvoStore } from "@/components/step";
import { Input } from "@/components/ui/input";

export const YoutubeInput = () => {
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  return (
    <div>
      <Input placeholder="Enter a YouTube URL" />
    </div>
  );
};
