import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages, context } = await req.json();

  const firstMessage = messages[0];

  firstMessage.content = `
    You are an expert at Chinese Language. Please try to answer users question based on the following context.
    If you don't know the answer, please dont try to make up facts. Just say that you don't know
    Context: 
    ${context?.slice(0, 2000)}`;

  // Use streamText to handle streaming
  const { textStream } = await streamText({
    model: openai("gpt-4o"),
    messages: messages,
  });

  // Return the stream as a Response
  return new Response(textStream, {
    headers: { "Content-Type": "text/plain" },
  });
}
