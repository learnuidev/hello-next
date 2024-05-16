"use client";

import { Icons } from "@/components/ui/icons.v2";
import { Conversation } from "@/domain/conversation/conversation.type";

export const ConvoHeader = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  return (
    <div className="my-16">
      <div>
        <h1 className="text-3xl font-light">{conversation?.title}</h1>
        <div className="mt-2 mb-8 flex items-center space-x-2">
          <h2 className="font-light">{conversation?.topic}</h2>
          <span className="text-gray-600"> | </span>
          <h3 className="font-light text-gray-400">{conversation?.subtopic}</h3>
        </div>
      </div>

      <div>
        <button>
          <Icons.play className="text-2xl lg:text-3xl" />
        </button>
      </div>
    </div>
  );
};
