"use client";

import { Conversation } from "@/domain/conversation/conversation.type";
import { useGetConversationQuery } from "@/domain/conversation/use-get-conversation-query";
import { useParams } from "next/navigation";

export const useCurrentConversation = () => {
  const params = useParams() as {
    "content-id": string;
  };

  const lessonId = params["content-id"];

  const { data: _conversation, ...rest } = useGetConversationQuery({
    conversationId: lessonId,
  });

  const conversation = _conversation as Conversation;

  return {
    ...rest,
    data: conversation,
  };
};
