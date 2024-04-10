"use client";

import { NavBar } from "@/components/navbar";
import { useState } from "react";
import { Message, useChat } from "ai/react";
import { TextGenerateEffect } from "@/components/text-generate-effect";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, data, isLoading } =
    useChat({
      api: "/api/summarize",
      body: {
        context: "我爱你",
      },
    } as any);

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };
  return (
    <main className="">
      <NavBar />

      <div className="px-4 md:px-32 md:my-4">
        <p>Chat</p>

        <div className="">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <input
              className="top-20 mb-8 mt-2 w-full rounded border border-muted p-2 shadow-xl"
              value={input}
              placeholder="Ask me anything..."
              onChange={handleInputChange}
            />
          </form>
        </div>

        {messages.length > 0
          ? messages.map((message: Message) => {
              if (message.role === "user") {
                return <h2 key={message.id}>{message.content}</h2>;
              }

              return (
                <div key={message.id}>
                  <TextGenerateEffect
                    words={message?.content?.split?.("\n")?.join(" ")}
                  />

                  <div key={message.id} className="whitespace-pre-wrap">
                    <div>{JSON.stringify(message)}</div>
                  </div>
                </div>
              );
              return (
                <TextGenerateEffect
                  key={message.id}
                  words={message?.content?.split?.("\n")?.join(". ")}
                />
              );
            })
          : null}
      </div>
    </main>
  );
}
