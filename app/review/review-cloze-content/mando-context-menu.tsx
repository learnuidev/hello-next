/* eslint-disable react-hooks/exhaustive-deps */

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Icons } from "@/components/ui/icons.v2";

import { getSelectedText } from "./utils/get-selected-text";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useIsSearchTrackingEnabled } from "@/hooks/use-is-search-tracking-enabled";
import { useRouter } from "next/navigation";

export function MandoContextMenu({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const addHistoryMutation = useAddHistoryMutation();
  const isSearchTrackingEnabled = useIsSearchTrackingEnabled();

  const router = useRouter();
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

            router.push(`/nmm/${selectedText}?lang=${lang}`);
          }}
        >
          <Icons.magnifyingGlass /> <span className="pl-4">Search</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
