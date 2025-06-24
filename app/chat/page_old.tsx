"use client";

import { NavBar } from "@/components/navbar";
import { useEffect, useState } from "react";
import { Message, useChat } from "ai/react";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import {
  useAddThreadMutation,
  useUpdateThreadMessagesMutation,
} from "@/domain/thread/thread.mutations";
import { IThread, useListThreadsQuery } from "@/domain/thread/thread.queries";
import { useRouter, useSearchParams } from "next/navigation";
import { GenUI } from "@/components/gen-ui";
import { Icons } from "@/components/ui/icons.v2";
import { aiModels } from "@/libs/ai";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useGetQueryClassifierQuery } from "@/domain/query-classifier/query-classifier.queries";

function UserQueryUI({ message }: { message: Message }) {
  const { data: queryClass } = useGetQueryClassifierQuery({
    query: message?.content,
  });

  return (
    <div>
      <h2 className="text-2xl font-extralight" key={message.id}>
        {message.content}
      </h2>

      {/* <h3>{JSON.stringify(queryClass)}</h3> */}

      <p className="text-gray-500">{queryClass as string}</p>
    </div>
  );
}

const AgentAnswer = ({
  message,
  threadId,
  finishedMsgs,
  messages,
}: {
  message: Message;
  finishedMsgs: Message[];
  threadId: string;
  messages: Message[];
}) => {
  const isFinished = Boolean(
    finishedMsgs?.length &&
      !!finishedMsgs?.find((msg: Message) => msg?.id === message?.id)
  );

  const msgIndex = messages?.findIndex((msg) => msg?.id === message.id);
  const userQuery = messages[msgIndex - 1]?.content || "";

  const [showGenUI, setShowGenUI] = useState(false);

  // console.log("FINISHED MSGS")

  return (
    <div key={message.content} className="pt-4 pb-8 text-gray-400 text-lg">
      {/* {threadId ? (
        <p className="font-extralight ">{message.content}</p>
      ) : (
        <TextGenerateEffect
          className="font-extralight "
          key={message.content}
          words={message?.content?.split?.("\n")?.join(" ")}
        />
      )} */}
      <TextGenerateEffect
        className="font-extralight text-gray-600"
        key={message.content}
        words={message?.content?.split?.("\n")?.join(" ")}
      />

      {/* <GenUI query={} /> */}
      {/* {isFinished && ( */}
      <div className="my-8 flex justify-end space-x-4">
        <button>
          <Icons.copy />
        </button>
        <button
          className="analyze"
          onClick={() => {
            setShowGenUI((prev) => !prev);
          }}
        >
          <Icons.calculatorSimple />
        </button>
      </div>
      {/* )} */}

      {showGenUI && <GenUI query={userQuery} answer={message?.content} />}
    </div>
  );
};

export default function Home() {
  const [isTocHidden, setIsTocHidden] = useState(false);
  const [updateThread, setUpdateThread] = useState(false);
  const [finishedMsgs, setFinishedMsgs] = useState([]);
  const [cachedInput, setCacheInput] = useState("");
  const [cachedMessages, setCachedMessages] = useState([]);
  const router = useRouter();

  const { data: authUser } = useCurrentAuthUser({});

  const searchParams = useSearchParams();
  const threadId = searchParams?.get("thread") || "";

  const { data: threads } = useListThreadsQuery();

  const threadItems = (threads as any)?.Items as IThread[];

  const thread = threadItems?.find(
    (thread) => thread?.id === threadId
  ) as IThread;

  const addThreadMutation = useAddThreadMutation();

  const updateThreadMutation = useUpdateThreadMessagesMutation();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    setInput,
    data,
    isLoading,
  } = useChat({
    api: "/api/summarize",
    body: {
      aiContext: {
        model: aiModels.gpt35Turbo,
        threadId,
      },
    },
    onResponse: (resp: any) => {},
    onFinish: (msg: any) => {
      setFinishedMsgs((prev) => prev.concat(msg));

      const msgs = JSON.parse(localStorage.getItem("messages") || "") as any;
      const input = JSON.parse(localStorage.getItem("query") || "") as any;

      // if (threadId) {
      setUpdateThread(true);
      // }

      // if (msgs?.length) {
      //   addThreadMutation
      //     .mutateAsync({
      //       id: threadId,
      //       query: input,
      //       messages: msgs,
      //     })
      //     .then((resp) => {
      //       router.push(`/chat?thread=${resp.id}`);
      //     });
      // }
    },
  } as any);

  useEffect(() => {
    const updateThreadAsyncFunction = async () => {
      return (
        updateThreadMutation
          // @ts-ignore
          .mutateAsync({
            threadId: searchParams.get("thread") || "",
            messages,
          })
          .then((resp) => {
            alert("updated");
          })
      );
    };

    if (updateThread) {
      setUpdateThread(() => {
        updateThreadAsyncFunction();
        return false;
      });
    }
  }, [messages, searchParams, updateThread, updateThreadMutation]);

  useEffect(() => {
    if (thread && thread?.messages) {
      setMessages(thread?.messages);
    }
  }, [setMessages, thread]);

  useEffect(() => {
    if (messages) {
      localStorage.setItem("messages", JSON.stringify(messages));

      setCachedMessages(() => messages as any);
    }

    if (input) {
      localStorage.setItem("query", JSON.stringify(input));
    }
  }, [messages, input]);

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };

  return (
    <main className="w-full">
      <NavBar />

      <div className="space-y-4 px-8 md:px-12 max-w-5xl mx-auto flex flex-col md:space-y-4">
        {/* <p>Chat</p> */}

        <div className="">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (!threadId) {
                handleSubmit(event);
                // handleSubmit(event);
                // handleSubmit(event);

                addThreadMutation
                  // @ts-ignore
                  .mutateAsync({
                    id: threadId,
                    query: input,
                    messages: messages,
                  })
                  .then((resp: any) => {
                    // handleSubmit(event);
                    router.push(`/chat?thread=${resp.id}`);
                  });

                return null;
              } else {
                handleSubmit(event);
              }
            }}
          >
            (
            <input
              className="-ml-6 font-extralight text-2xl top-20 mb-8 mt-2 w-full bg-black rounded-full h-12 px-4 border-transparent focus:border-transparent focus:ring-0 border border-gray-900 shadow-xl !outline-none"
              value={input}
              disabled={isLoading}
              placeholder="Ask me anything..."
              onChange={(evt) => {
                setCacheInput(evt.target.value);
                handleInputChange(evt);
              }}
            />
          </form>
        </div>

        {/* <div className={formPositionClass}> */}

        <div>
          {messages.length > 0
            ? messages.map((message: Message) => {
                if (message.role === "user") {
                  return <UserQueryUI message={message} key={message.id} />;
                }

                return (
                  <AgentAnswer
                    threadId={threadId}
                    key={message?.id}
                    message={message}
                    finishedMsgs={finishedMsgs}
                    messages={messages}
                  />
                );
              })
            : null}
        </div>
      </div>
    </main>
  );
}
