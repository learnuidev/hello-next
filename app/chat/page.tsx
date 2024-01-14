"use client";

import { NavBar } from "@/components/navbar";
import { useState } from "react";
import { Message, useChat } from "ai/react";

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, data, isLoading } =
    useChat({
      api: "/api/mistral",
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
          ? messages.map((m: Message) => {
              return (
                <div key={m.id} className="whitespace-pre-wrap">
                  <div>{JSON.stringify(m)}</div>
                </div>
              );
            })
          : null}
      </div>
    </main>
  );
}
