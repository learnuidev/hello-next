"use client";

import { useConversation } from "@11labs/react";
import { useEffect, useState } from "react";

const conversationConfig = {
  agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "",
};

export default function Lili() {
  const conversation = useConversation({});
  const [hasPermission, setHasPermission] = useState(false);
  const [agentState, setAgent] = useState<any>();
  const [errorMessage, setErrorMessage] = useState("");
  const { status, isSpeaking } = conversation;

  const handleStartConversation = async () => {
    const agent = await conversation.startSession({
      agentId: conversationConfig.agentId,
    });

    setAgent(agent);
  };
  const handleEndConversation = async () => {
    await conversation.endSession();
  };
  const toggleMute = async () => {};

  useEffect(() => {
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setHasPermission(true);
      } catch (error) {
        setHasPermission(false);
        setErrorMessage((error as Error).message);
        console.log(`Error accessing microphone`, error);
      }
    };

    requestMicPermission();
  }, []);

  console.log("CONVERSATION", conversation);
  console.log("CONVERSATION", conversation.getInputByteFrequencyData());

  console.log("AGENT", agentState);
  // console.log("CONVERSATION ID", conversation?.getId());
  return (
    <div>
      <p className="text-4xl text-center mt-8 mb-32"> lili</p>
      <code>
        <pre>{JSON.stringify(conversation, null, 4)}</pre>
        <pre>
          {JSON.stringify(
            {
              hasPermission,
              errorMessage,
            },
            null,
            4
          )}
        </pre>
        <pre>{JSON.stringify(conversationConfig, null, 4)}</pre>
      </code>

      <div className="flex justify-center mt-8 space-x-8">
        <button onClick={handleStartConversation} className="">
          Start Conversation
        </button>
        <button onClick={handleEndConversation} className="">
          End Conversation
        </button>
      </div>
    </div>
  );
}
