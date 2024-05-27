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
import { useGetContentQuery } from "@/domain/content/content.queries";
import { Editor } from "@/components/Editor";

function UserQueryUI({ message }: { message: Message }) {
  //   const { data: queryClass } = useGetQueryClassifierQuery({
  //     query: message?.content,
  //   });

  console.log("CONTENT", message?.content);

  //   console.log("QUERY CLASS", queryClass);
  return (
    <div>
      <h2 className="text-2xl font-extralight" key={message.id}>
        {message.content}
      </h2>

      {/* <h3>{JSON.stringify(queryClass)}</h3> */}

      {/* <p className="text-gray-500">{queryClass as string}</p> */}
    </div>
  );
}

function isSerializable(content: string) {
  try {
    return Array.isArray(JSON.parse(content));
  } catch (err) {
    return false;
  }
}

const TableView = ({ content }: { content: string }) => {
  const canViewAsTable = isSerializable(content);

  if (!canViewAsTable) {
    return <div> Content Not Supported </div>;
  }

  const data = JSON.parse(content);

  const tableHeaders = Object.keys(data?.[0]).filter((item) => item !== "lang");

  return (
    <div className="h-80 overflow-auto">
      <table className="flex flex-col scroll-y-auto h-96">
        <thead>
          <tr className="grid grid-cols-8 items-center justify-center">
            {tableHeaders?.map((header) => {
              return (
                <th key={header} scope="col" className="text-left">
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data?.map((item: any) => {
            return (
              <tr
                key={JSON.stringify(item)}
                className="grid grid-cols-8 items-center justify-center text-sm"
              >
                <th scope="row" className="text-left font-light">
                  {item?.[tableHeaders?.[0]]}
                </th>
                <td className="text-left"> {item?.[tableHeaders?.[1]]}</td>
                <td className="text-left"> {item?.[tableHeaders?.[2]]}</td>
                {/* <td className="text-left"> {item?.[tableHeaders?.[3]]}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

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

  const [viewType, setViewType] = useState("table");

  const msgIndex = messages?.findIndex((msg) => msg?.id === message.id);
  const userQuery = messages[msgIndex - 1]?.content || "";

  const [showGenUI, setShowGenUI] = useState(false);

  // console.log("FINISHED MSGS")

  return (
    <div key={message.content} className="pt-4 pb-8 text-gray-300 text-lg">
      {/* {threadId ? (
        <p className="font-extralight ">{message.content}</p>
      ) : (
        <TextGenerateEffect
          className="font-extralight "
          key={message.content}
          words={message?.content?.split?.("\n")?.join(" ")}
        />
      )} */}

      {viewType === "editor" ? (
        <p className="h-80">{message.content}</p>
      ) : (
        // <Editor content={message.content} />
        <TableView content={message.content} />
      )}

      {/* <TextGenerateEffect
        className="font-extralight text-gray-600"
        key={message.content}
        words={message?.content?.split?.("\n")?.join(" ")}
      /> */}

      {/* <GenUI query={} /> */}
      {/* {isFinished && ( */}
      <div className="my-8 flex justify-end space-x-4">
        <button
          onClick={() => {
            setViewType("table");
          }}
          className={`transition ${
            viewType === "table" ? "text-gray-200" : "text-gray-800"
          } hover:text-white transition text-xl`}
        >
          <Icons.table />
        </button>
        <button
          onClick={() => {
            setViewType("editor");
          }}
          className={`transition ${
            viewType === "editor" ? "text-gray-200" : "text-gray-800"
          } hover:text-white transition text-xl`}
        >
          <Icons.paragraph />
        </button>
        <button
          className={`transition ${
            viewType === "analyze" ? "text-gray-200" : "text-gray-800"
          } hover:text-white transition text-xl`}
          //   className="analyze"
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

export const AI = ({ lessonId }: { lessonId: string }) => {
  const [isTocHidden, setIsTocHidden] = useState(false);
  const [updateThread, setUpdateThread] = useState(false);
  const [finishedMsgs, setFinishedMsgs] = useState([]);
  const [cachedInput, setCacheInput] = useState("");
  const [cachedMessages, setCachedMessages] = useState([]);
  const router = useRouter();

  const { data: lesson2 } = useGetContentQuery({ contentId: lessonId });

  const { data: authUser } = useCurrentAuthUser({});

  const searchParams = useSearchParams();
  const threadId = searchParams?.get("thread") || "";

  const { data: threads } = useListThreadsQuery();

  console.log("THREADS", threads);

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
    api: "/api/question-answer",
    body: {
      context: JSON.stringify(lesson2),
      //   aiContext: {
      //     model: aiModels.gpt35Turbo,
      //     threadId,
      //   },
    },
    onResponse: (resp: any) => {},
    onFinish: (msg: any) => {
      setFinishedMsgs((prev) => prev.concat(msg));

      const msgs = JSON.parse(localStorage.getItem("messages") || "") as any;
      const input = JSON.parse(localStorage.getItem("query") || "") as any;

      console.log("MSG");

      // if (threadId) {
      //   setUpdateThread(true);
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
    console.log("LESSON ID", lessonId);
    const msgs = JSON.parse(localStorage.getItem(lessonId) as any) || [];

    console.log("MSGS", msgs);
    if (msgs?.length) {
      setMessages(msgs);
    }
  }, [lessonId, setMessages]);

  //   useEffect(() => {
  //     const updateThreadAsyncFunction = async () => {
  //       return updateThreadMutation
  //         .mutateAsync({
  //           threadId: searchParams.get("thread") || "",
  //           messages,
  //         })
  //         .then((resp) => {
  //           alert("updated");
  //         });
  //     };

  //     if (updateThread) {
  //       setUpdateThread(() => {
  //         updateThreadAsyncFunction();
  //         return false;
  //       });
  //     }
  //   }, [messages, searchParams, updateThread, updateThreadMutation]);

  //   useEffect(() => {
  //     if (thread && thread?.messages) {
  //       setMessages(thread?.messages);
  //     }
  //   }, [setMessages, thread]);

  useEffect(() => {
    if (messages?.length > 0) {
      localStorage.setItem(lessonId, JSON.stringify(messages));

      setCachedMessages(() => messages as any);
    }

    if (input) {
      localStorage.setItem("query", JSON.stringify(input));
    }
  }, [messages, input, lessonId]);

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };

  return (
    <main className="w-full">
      <div className="space-y-4 flex flex-col md:space-y-4">
        {/* <p>Chat</p> */}

        <div className="">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              handleSubmit(event);
              //   if (!threadId) {
              //     handleSubmit(event);
              //     // handleSubmit(event);
              //     // handleSubmit(event);
              //     addThreadMutation
              //       .mutateAsync({
              //         id: threadId,
              //         query: input,
              //         messages: messages,
              //       })
              //       .then((resp) => {
              //         // handleSubmit(event);
              //         router.push(`/chat?thread=${resp.id}`);
              //       });

              //     return null;
              //   } else {
              //     handleSubmit(event);
              //   }
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
};
