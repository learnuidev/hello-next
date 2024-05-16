"use client";

import { Conversation } from "@/domain/conversation/conversation.type";

export const ConvoViewType = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  return (
    <section className="flex flex-col space-y-8">
      {conversation?.conversation?.map((convo) => {
        return (
          <div key={convo?.input} className="flex space-y-2 flex-col">
            <p className="min-w-40">
              <span className="font-bold">{convo?.speaker}</span>:{" "}
            </p>
            <div>
              {["zh", "hi", "ne", "ar", "fa", "ml", "vi"]?.includes(
                conversation?.lang
              ) && (
                <p className="text-gray-500">
                  <span className="font-extralight"> {convo?.roman}</span>
                </p>
              )}
              <h4>
                <span className="font-light"> {convo?.input}</span>
              </h4>

              <p className="text-gray-400">
                <span className="font-light"> {convo?.en}</span>
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
