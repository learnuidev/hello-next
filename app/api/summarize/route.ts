import { tavilySearch } from "@/libs/tavily/tavily-search";

import { openaiConfig } from "@/libs/openai/openai.config";

import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  apiKey: openaiConfig?.apiKey,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages, aiContext } = await req.json();

  const lastMessage = messages?.[messages?.length - 1];

  const userQuery = lastMessage?.content;

  const context = await tavilySearch({
    query: userQuery,
    maxResults: 10,
    searchDepth: "basic",
  });

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

  const { textStream } = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: [firstMessage, ...messages],
  });

  // Return the stream as a Response
  return new Response(textStream, {
    headers: { "Content-Type": "text/plain" },
  });
}
