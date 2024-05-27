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
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { cn, removeNull } from "@/lib/utils";

function UserQueryUI({ message }: { message: Message }) {
  //   const { data: queryClass } = useGetQueryClassifierQuery({
  //     query: message?.content,
  //   });

  return (
    <div>
      <h2 className="text-2xl font-extralight text-gray-500" key={message.id}>
        {/* {"> "} */}
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

  const { data: hskWords } = useListHSKWordsQuery();

  if (!canViewAsTable) {
    return <div> Content Not Supported </div>;
  }

  const data = JSON.parse(content);

  const formattedData = data?.map((item: any) => {
    const hskLevel = hskWords?.find(
      (hskWord: any) => hskWord?.hanzi === item?.input
    );

    const hskLevels = [
      ...new Set(
        hskWords
          ?.filter((hskWord: any) => {
            return item?.input?.includes(hskWord?.hanzi);
          })
          ?.map((hskWord: any) => hskWord?.level)
      ),
    ]?.join(", ");

    return removeNull({
      ...item,
      hsk: hskLevel?.level || hskLevels,
    });
  });

  const containsOnlyHsk = formattedData?.every(
    (data: any) => data?.hsk !== 9000
  );
  const containsSomeHsk = formattedData?.some(
    (data: any) => data?.hsk !== 9000
  );

  const tableHeaders = containsSomeHsk
    ? [...Object.keys(formattedData?.[0]).filter((item) => item !== "lang")]
    : ["en", "input", "roman"];

  const colors = {
    1: "text-white",
    2: "text-white",
    3: "text-white",
    4: "text-white",
    5: "text-white",
    6: "text-white",
    7: "text-white",
    8: "text-white",
    9: "text-white",
    9000: "text-gray-300",
  } as any;

  const gridType = containsSomeHsk ? "grid-cols-4" : "grid-cols-3";

  return (
    <div className="">
      <table className="flex flex-col">
        <thead>
          <tr
            className={cn(
              "grid items-center justify-center text-gray-400 gap-x-4",
              gridType
            )}
          >
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
          {formattedData?.map((item: any) => {
            // const isInput =
            return (
              <tr
                key={JSON.stringify(item)}
                className={cn(
                  colors?.[item?.hsk] || "text-white",
                  `grid items-center justify-center gap-x-4`,
                  gridType
                )}
              >
                <th scope="row" className="text-left font-light">
                  {item?.[tableHeaders?.[0]]}
                </th>
                <td className="text-left"> {item?.[tableHeaders?.[1]]}</td>
                <td className="text-left"> {item?.[tableHeaders?.[2]]}</td>
                {containsSomeHsk && (
                  <td className="text-left">
                    {" "}
                    {item?.[tableHeaders?.[3]] === 9000
                      ? null
                      : item?.[tableHeaders?.[3]]}
                  </td>
                )}
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
  updateMessages,
  messages,
  questionMessage,
}: {
  questionMessage: Message;
  message: Message;
  finishedMsgs: Message[];
  threadId: string;
  updateMessages: (messages: Message[]) => void;
  messages: Message[];
}) => {
  const isFinished = Boolean(
    finishedMsgs?.length &&
      !!finishedMsgs?.find((msg: Message) => msg?.id === message?.id)
  );

  const [viewType, setViewType] = useState("editor");

  const msgIndex = messages?.findIndex((msg) => msg?.id === message.id);
  const userQuery = messages[msgIndex - 1]?.content || "";

  const canViewAsTable = isSerializable(message?.content);

  const [showGenUI, setShowGenUI] = useState(false);

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

      {!canViewAsTable ? (
        <div className="overflow-auto">
          <Editor
            className="font-light md:w-8/12 w-full"
            content={message.content}
          />
          {/* <p className="font-light md:w-8/12 w-full">{message.content}</p> */}
        </div>
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
      <div className="flex justify-end space-x-4 mt-8 mb-4">
        {canViewAsTable && (
          <button
            onClick={() => {
              setViewType("table");
            }}
            className={`transition ${
              true ? "text-gray-200" : "text-gray-800"
            } hover:text-white transition text-xl`}
          >
            <Icons.table />
          </button>
        )}
        {!canViewAsTable && (
          <button
            onClick={() => {
              setViewType("editor");
            }}
            className={`transition ${
              true ? "text-gray-200" : "text-gray-800"
            } hover:text-white transition text-xl`}
          >
            <Icons.paragraph />
          </button>
        )}
        <button
          className={`transition ${
            viewType === "analyze" ? "text-gray-200" : "text-gray-800"
          } hover:text-white transition text-xl`}
          onClick={() => {
            setShowGenUI((prev) => !prev);
          }}
        >
          <Icons.calculatorSimple />
        </button>
        <button
          className={`transition ${
            viewType === "analyze" ? "text-gray-200" : "text-gray-800"
          } hover:text-white transition text-xl`}
          onClick={() => {
            updateMessages(
              messages
                ?.filter((msg) => msg?.id !== message?.id)
                ?.filter((msg) => msg?.id !== questionMessage?.id)
            );
            // setShowGenUI((prev) => !prev);
          }}
        >
          <Icons.trash />
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

  const updateMessages = (newMessages: any) => {
    // if (newMessages?.length > 0) {
    localStorage.setItem(lessonId, JSON.stringify(messages));
    setMessages(newMessages);
    // }
  };

  useEffect(() => {
    const msgs = JSON.parse(localStorage.getItem(lessonId) as any) || [];

    if (
      msgs?.length
      //   && JSON.stringify(msgs) !== localStorage.getItem(lessonId)
    ) {
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
            ? messages.map((message: Message, idx) => {
                if (message.role === "user") {
                  return <UserQueryUI message={message} key={message.id} />;
                }

                const questionMessage = messages[idx - 1];

                return (
                  <AgentAnswer
                    questionMessage={questionMessage}
                    updateMessages={updateMessages}
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
