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
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useIsSearchTrackingEnabled } from "@/hooks/use-is-search-tracking-enabled";

export function MandoContextMenu({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const addHistoryMutation = useAddHistoryMutation();
  const isSearchTrackingEnabled = useIsSearchTrackingEnabled();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem
          onClick={() => {
            const selectedText = getSelectedText();
            if (isSearchTrackingEnabled) {
              addHistoryMutation.mutate({
                input: selectedText,
                lang,
                eventType: "SEARCH",
              } as any);
            }

            openInNewWindow(`/nmm/${selectedText}?lang=${lang}`);
          }}
        >
          <Icons.magnifyingGlass /> <span className="pl-4">Search</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
