import { aiModels } from "@/libs/ai";

import { tavilySearch } from "@/libs/tavily/tavily-search";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

// @ts-ignore
// import MistralClient from "@mistralai/mistralai";
// import { mistralConfig } from "@/libs/mistral/mistral-config";

import { openaiConfig } from "@/libs/openai/openai.config";

const openai = new OpenAI({
  apiKey: openaiConfig?.apiKey,
});

// const mistral = new MistralClient(mistralConfig.apiKey);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages, aiContext } = await req.json();

  console.log("THREAD ID", aiContext.threadId);

  const lastMessage = messages?.[messages?.length - 1];
  const firstButLastMessages = messages.slice(0, -1);
  // const [...firstButLastMessages, lastMessage] = messages;
  const userQuery = lastMessage?.content;

  const context = await tavilySearch({
    query: userQuery,
    maxResults: 10,
    searchDepth: "basic",
  });

  // lastMessage.references = context;

  console.log("CONTEXT", context);

  const promptSimple = `
You are a language translation and summary expert
For the given content, translate it in english please. 

Given the content, try to give the best answer as you can. Try to refer to the given context:

${JSON.stringify(context)}

Also give a brief summary of the content. Keep it less than 300 characters

Pleae use plain english and do not use line breaks or any special characters. Don't use quotations as well

If you dont know the answer, please say you dont know
`;

  const perplexityPrompt = `

Generate a comprehensive and informative answer (but no more than 80 words) for a given question solely based on the provided web Search Results (URL and Summary). You must only use information from the provided search results. Use an unbiased and journalistic tone. Use this current date and time: Wednesday, December 07, 2022 22:50:56 UTC. Combine search results together into a coherent answer. Do not repeat text. Cite search results using [number] notation. Only cite the most relevant results that answer the question accurately. If different results refer to different entities with the same name, write separate answers for each entity.

Web Search Results:
${JSON.stringify(context)}
`;

  let firstMessage = {
    role: "system",
    // content: promptSimple,
    content: perplexityPrompt,
  };

  const selectedAiModel = aiModels.gpt35Turbo;

  console.log("SELECED AI MODEL", selectedAiModel);

  // const firstMessage = messages[0];

  // Ask OpenAI for a streaming chat completion given the prompt

  // const response = mistral.chatStream({
  //   model: "mistral-small",
  //   maxTokens: 1000,
  //   messages,
  // });

  // Convert the response into a friendly text-stream. The Mistral client responses are
  // compatible with the Vercel AI SDK MistralStream adapter.

  const response = await openai.chat.completions.create({
    // model: "gpt-4-turbo",
    model: aiModels.gpt35Turbo,
    stream: true,
    messages: [firstMessage, ...messages],
  });

  // let response =
  //   selectedAiModel === aiModels.gpt35Turbo
  //     ? await openai.chat.completions.create({
  //         // model: "gpt-4-turbo",
  //         model: selectedAiModel,
  //         stream: true,
  //         messages: [firstMessage, ...messages],
  //       })
  //     : mistral.chatStream({
  //         model: "mistral-small",
  //         maxTokens: 1000,
  //         messages,
  //       });
  // let stream

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // const stream =
  //   selectedAiModel === aiModels.gpt35Turbo
  //     ? OpenAIStream(response)
  //     : MistralStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
