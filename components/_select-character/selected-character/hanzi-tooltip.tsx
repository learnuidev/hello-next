"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { PreviewComponent } from "@/app/nmm/preview-component";
import { cleanString } from "@/data/convos/bm1/clean-string";

export const HanziTooltip = (props: {
  component: {
    hanzi: string;
    input: string;
    level?: number;
    lang?: string;
    pinyin?: string;
    en: string;
  };
  character: string;
  lang: string;
  children: React.ReactNode;
}) => {
  const { component, children, character, lang } = props;

  return (
    <TooltipProvider>
      <Tooltip>
        {/* <TooltipTrigger className="hover:scale-125 transition"> */}
        <TooltipTrigger className="transition">{children}</TooltipTrigger>
        <TooltipContent className="dark:bg-black bg-white flex justify-start flex-col w-80 text-left  border-gray-800">
          {/* <p>yoo</p> */}
          <PreviewComponent
            component={component}
            character={character?.replaceAll(",", "")}
            lang={lang}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
