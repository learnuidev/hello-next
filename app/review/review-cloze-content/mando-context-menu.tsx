/* eslint-disable react-hooks/exhaustive-deps */

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Icons } from "@/components/ui/icons.v2";
import { openInNewWindow } from "./utils/open-in-new-window";
import { getSelectedText } from "./utils/get-selected-text";

export function MandoContextMenu({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          onClick={() => {
            openInNewWindow(`/nmm/${getSelectedText()}?lang=${lang}`);
          }}
        >
          <Icons.magnifyingGlass /> <span className="pl-4">Search</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
