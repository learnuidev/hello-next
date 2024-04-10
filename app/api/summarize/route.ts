import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  const promptSimple = `
You are a language translation expert and summary
For the given content, translate it in english please. Also give a brief summary of the content. Keep it less than 300 characters

Pleae use plain english and do not use line breaks or any special characters. Don't use quotations as well
`;

  let firstMessage = {
    role: "system",
    content: promptSimple,
  };

  // const firstMessage = messages[0];

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    // model: "gpt-4",
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [firstMessage, ...messages],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
