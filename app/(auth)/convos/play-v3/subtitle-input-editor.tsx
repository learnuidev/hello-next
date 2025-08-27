import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { cn } from "@/lib/utils";

export const SubtitleInputEditor = ({
  title,
  setTimer,
  subtitle,
  attribute,
  className,
}: {
  className?: string;
  title: string;
  attribute: "input" | "hanzi" | "pinyin" | "roman" | "en";
  setTimer: any;
  subtitle: {
    id: string;
    input: string;
    hanzi: string;
    pinyin: string;
    roman: string;
    en: string;
  };
}) => {
  const times = useContentEditStore((state) => state.times);

  const timeStamp = times?.find(
    (time: any) => time?.id === subtitle?.id
  ) as any;

  console.log("SUB TITLE", subtitle?.[attribute]);
  return (
    <div>
      <p>{title}</p>
      <textarea
        className={cn(
          "w-full mb-4 focus-visible:outline-none focus-visible:ring-ring",
          className
        )}
        value={timeStamp?.[attribute] || subtitle?.[attribute]}
        onChange={(event) => {
          setTimer(attribute, subtitle, event?.target?.value);
        }}
      />
    </div>
  );
};
