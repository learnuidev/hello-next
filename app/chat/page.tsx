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
        {/* <p>Chat</p> */}

        <div className="">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            (
            <input
              className="-ml-6 font-extralight text-2xl top-20 mb-8 mt-2 w-full bg-black rounded-full h-12 px-4 border-transparent focus:border-transparent focus:ring-0 border border-gray-900 shadow-xl !outline-none"
              value={input}
              disabled={isLoading}
              placeholder="Ask me anything..."
              onChange={handleInputChange}
            />
          </form>
        </div>

        {/* <div className={formPositionClass}> */}

        <div className="">
          {messages.length > 0
            ? messages.map((message: Message) => {
                if (message.role === "user") {
                  return (
                    <h2
                      className="text-3xl mt-8 mb-12 text-gray-400"
                      key={message.id}
                    >
                      {message.content}
                    </h2>
                  );
                }

                return (
                  <div key={message.content} className="mb-24 ">
                    <TextGenerateEffect
                      className="font-extralight text-gray-300"
                      key={message.content}
                      words={message?.content?.split?.("\n")?.join(" ")}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </main>
  );
}
