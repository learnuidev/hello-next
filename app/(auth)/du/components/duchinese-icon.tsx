import { cn } from "@/lib/utils";

export const DuChineseIcon = ({ className }: { className?: string }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      src="https://duchinese.net/vite/assets/brand-logo-DQSdbKZX.svg"
      className={cn("w-full h-8", className)}
    />
  );
};
