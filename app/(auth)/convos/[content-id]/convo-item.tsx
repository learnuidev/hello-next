"use client";

import { Conversation } from "@/domain/conversation/conversation.type";
import { useGetConversationQuery } from "@/domain/conversation/use-get-conversation-query";
import { useParams } from "next/navigation";

export default function ConvoItem() {
  const params = useParams() as {
    "content-id": string;
  };

  const lessonId = params["content-id"];

  const { data: conversation } = useGetConversationQuery({
    conversationId: lessonId,
  });

  const convoItem = conversation as Conversation;

  return (
    <main className="mx-4 md:mx-16">
      <div className="my-16">
        <h1 className="text-3xl font-light">{convoItem?.title}</h1>
        <div className="mt-2 mb-8 flex items-center space-x-2">
          <h2 className="font-light">{convoItem?.topic}</h2>
          <span className="text-gray-600"> | </span>
          <h3 className="font-light text-gray-400">{convoItem?.subtopic}</h3>
        </div>
      </div>
      <section className="flex flex-col space-y-8">
        {convoItem?.conversation?.map((convo) => {
          return (
            <div key={convo?.input} className="flex space-y-2 flex-col">
              <p className="min-w-40">
                <span className="font-bold">{convo?.speaker}</span>:{" "}
              </p>
              <div>
                {["zh", "hi", "ne", "ar", "fa", "ml", "vi"]?.includes(
                  convoItem?.lang
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
    </main>
  );
}
