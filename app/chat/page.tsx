"use client";

import { NavBar } from "@/components/navbar";
import { Icons } from "@/components/ui/icons.v2";
import { useState } from "react";

interface Role {
  id?: string;
  title: string;
}

interface ActionItem {
  title: string;
  description?: string;
}

interface ChatGoal {
  title: string;
}

interface Phrase {
  title: string;
  lang?: string;
}
interface ChatContext {
  title: string;
  scenario: string;
  goals: ChatGoal[];
  actionItems: ActionItem[];
  starterPhrases?: Phrase[];
  humanRole?: Role;
  aiRole?: Role;
}

const defaultContext: ChatContext = {
  title: "At Mama's Restaurant",
  scenario:
    "You are at a Vacation in Montreal and you havent eaten all day. You wake up to a dumpling restaurant in Saint Hubert and the cashier greets you",
  goals: [{ title: "Order Food" }],
  humanRole: {
    id: "customer",
    title: "a customer",
  },
  aiRole: {
    id: "cashier",
    title: "a cashier",
  },

  actionItems: [
    { title: "Ask whats on the menu" },
    {
      title: "Ask for a recommendation",
    },
    {
      title: "Order three portions of dumpling to go",
    },
  ],

  starterPhrases: [
    {
      title:
        "Its my first time here, could you recommend me something special?",
    },
    { title: "Can I have 1 fried pork dumplings with cilantro please?" },
    { title: "Excuse me, where is the washroom?" },
    { title: "Its really beautiful outside." },
  ],
};

const createChat = (context = defaultContext): ChatContext => {
  return context;
};

const chatTemplates: ChatContext[] = [
  {
    title: "Latte at Starbucks",
    scenario: "Latte at Starbucks",
    goals: [{ title: "Ordering a latte" }],

    humanRole: {
      id: "customer",
      title: "a customer",
    },
    aiRole: {
      id: "barista",
      title: "a barista",
    },

    starterPhrases: [
      {
        title: "Its my first time here, could you recommend me something",
        lang: "en",
      },
      { title: "Can I have 3 medium lattes on a cup holder please?" },
      { title: "Excuse me, can I please have the keys to the washroom?" },
      { title: "Excuse me, can I have 2 medium lattes and a brownie please?" },
    ],
    actionItems: [{ title: "Order a small latte" }],
  },

  createChat(),

  createChat({
    ...defaultContext,
    title: "At Adidas Outlet",
    scenario:
      "You are shopping at a mall in Beijing. You walk into a Adidas store and a staff member greets you",
    goals: [
      { title: "To order a pair of shoes" },
      {
        title: "To ask recommendations for running shoes",
      },
      {
        title: "Buy running clothes at Adidas",
      },
    ],
  }),
];

const ChatInfoItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="mx-4 flex flex-col justify-center items-start md:mx-32 mt-8">
      <h1 className="text-lg text-gray-400">{title}</h1>

      <div className="mt-4">{children}</div>
    </section>
  );
};

const ChatInfo = ({ chatContext }: { chatContext: ChatContext }) => {
  return (
    <div>
      <section className="mx-4 mt-4 md:mt-24">
        <h1 className="text-center text-3xl md:text-5xl lg:text-6xl my-4 font-light">
          {chatContext.title}
        </h1>

        <h2 className="mb-4 md:mb-12 mx-8 md:mx-32 text-center text-lg text-gray-300 md:text-xl">
          {chatContext.scenario}
        </h2>
      </section>
      <ChatInfoItem title={"Goals"}>
        <div className="mt-4">
          {chatContext.goals?.map((actionItem) => {
            return <p key={actionItem.title}>{actionItem.title}</p>;
          })}
        </div>
      </ChatInfoItem>
      <ChatInfoItem title={"Action Items"}>
        <div className="mt-4">
          {chatContext?.actionItems?.map((actionItem) => {
            return <p key={actionItem.title}>{actionItem.title}</p>;
          })}
        </div>
      </ChatInfoItem>
      <ChatInfoItem title={"Starter Phrases"}>
        <div className="mt-4">
          {chatContext?.starterPhrases?.map((actionItem) => {
            return <p key={actionItem.title}>{actionItem.title}</p>;
          })}
        </div>
      </ChatInfoItem>
    </div>
  );
};

const ChatTemplatesList = ({ setChatContext }: { setChatContext: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-around pt-24 text-2xl wrap gap-y-8">
      {chatTemplates?.map((template) => {
        return (
          <button
            className="block"
            onClick={() => {
              setChatContext(template);
            }}
            key={template.title}
          >
            {template.title}
          </button>
        );
      })}
    </div>
  );
};

const ChatHeader = ({ setChatContext }: { setChatContext: any }) => {
  return (
    <div className="flex justify-between mx-4 my-4">
      {/* <NavBar /> */}

      <button>
        <Icons.plusIcon className="text-2xl" />
      </button>

      <button
        onClick={() => {
          setChatContext((prev: any) => (prev === null ? createChat() : null));
        }}
      >
        <Icons.xMark className="text-2xl" />
      </button>
    </div>
  );
};

export default function Home() {
  const [chatContext, setChatContext] = useState<ChatContext | null>(
    createChat()
  );

  return (
    <main className="w-full">
      <ChatHeader setChatContext={setChatContext} />

      {chatContext ? (
        <ChatInfo chatContext={chatContext} />
      ) : (
        <ChatTemplatesList setChatContext={setChatContext} />
      )}
    </main>
  );
}
