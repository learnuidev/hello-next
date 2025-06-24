import { streamText } from "ai";

import { verifyJwt } from "@/libs/cognito/jwt";
import { deepseekConfig } from "@/libs/deepseek/deepseek-config";
import { headers } from "next/headers";

import { createDeepSeek } from "@ai-sdk/deepseek";

const deepseek = createDeepSeek({
  apiKey: deepseekConfig.apiKey ?? "",
  baseURL: "https://api.deepseek.com",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, context } = await req.json();

  const headersApi = await headers();

  const jwtToken = headersApi.get("authorization") || "";

  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });

  if (isVerified) {
    const prompt = `
  
  Generate a comprehensive and informative answer (but no more than 80 words) for a 
  given question solely based on the context. 
  You must only use information from the context. 
  Use an unbiased and journalistic tone.  
  Combine context into a coherent answer. 
  Do not repeat text.
  If different results refer to different entities with the same name, write separate answers for each entity.
  
  Context:
  ${JSON.stringify(context)}
  `;

    let firstMessage = {
      role: "system",
      content: prompt,
    };

    const { textStream } = await streamText({
      model: deepseek("deepseek-chat"),
      messages: messages,
    });

    // Return the stream as a Response
    return new Response(textStream, {
      headers: { "Content-Type": "text/plain" },
    });
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
