"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { PreviewComponent } from "@/app/nmm/preview-component";

export const HanziTooltip = (props: {
  component: {
    hanzi: string;
    level?: number;
    lang?: string;
    pinyin?: string;
    en: string;
  };
  children: React.ReactNode;
}) => {
  const { component, children } = props;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="transition">{children}</TooltipTrigger>
        <TooltipContent className="bg-black border-gray-800">
          <PreviewComponent component={component} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
