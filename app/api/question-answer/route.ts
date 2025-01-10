import { aiModels } from "@/libs/ai";

import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

import { openaiConfig } from "@/libs/openai/openai.config";
import { verifyJwt } from "@/libs/cognito/jwt";
import { getJwtToken } from "../utils";
import { headers } from "next/headers";
import { deepseekConfig } from "@/libs/deepseek/deepseek-config";

const openai = new OpenAI({
  apiKey: deepseekConfig.apiKey,
  baseURL: "https://api.deepseek.com",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, context } = await req.json();

  // const jwtToken = getJwtToken();

  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";

  // return jwtToken;

  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });

  if (isVerified || true) {
    const prompt = `
  
  Generate a comprehensive and informative answer (but no more than 80 words) for a 
  given question solely based on the context. 
  You must only use information from the context. 
  Use an unbiased and journalistic tone.  
  Combine context into a coherent answer. 
  Do not repeat text.
  If different results refer to different entities with the same name, write separate answers for each entity.

 If the user specifically asks to extract key words in json format, use this format for each word/sentence
 [{"en": "..", "input": "..", "lang": "..", "roman": ".."}
  
  Context:
  ${JSON.stringify(context)}
  `;

    let firstMessage = {
      role: "system",
      content: prompt,
    };

    const selectedAiModel = aiModels.gpt35Turbo;

    const response = await openai.chat.completions.create({
      model: aiModels.gpt35Turbo,
      stream: true,
      messages: [firstMessage, ...messages],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
