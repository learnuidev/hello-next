"use client";

import { useCurrentConversation } from "./use-current-convorsation";
import { ConvoHeader } from "./convo-header";
import { ConvoViewType } from "./convo-viewtype";
import { ConvoLoadingScreen } from "./convo-loading-screen";

export default function ConvoItem() {
  const { data: conversation, isLoading } = useCurrentConversation();

  if (isLoading) {
    return <ConvoLoadingScreen />;
  }

  return (
    <main className="mx-4 md:mx-16">
      <ConvoHeader conversation={conversation} />
      <ConvoViewType conversation={conversation} />
    </main>
  );
}
