import { OpenAIStream, StreamingTextResponse } from "ai";

// Note: There are no types for the Mistral API client yet.
// @ts-ignore
import MistralClient from "@mistralai/mistralai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

const MISTRAL_API_KEY = "TEfjJQjDuVBhlVZKwdElCjKa6rGLZNWA";

const client = new MistralClient(MISTRAL_API_KEY || "");

// List Models
const listModelsResponse = await client.listModels();
const listModels = listModelsResponse.data;
// listModels.forEach((model) => {
//   console.log("Model:", model);
// });

// Chat
const chatResponse = await client.chat({
  model: "mistral-tiny",
  messages: [{ role: "user", content: "What is the best French cheese?" }],
});

console.log("Chat:", chatResponse.choices[0].message.content);

// const response = await client.chatStream({
//   model: "mistral-tiny",
//   stream: true,
//   max_tokens: 1000,
//   messages: [{ role: "user", content: "what does this mean" }],
// });

// // Convert the response into a friendly text-stream. The Mistral client responses are
// // compatible with the Vercel AI SDK OpenAIStream adapter.
// const stream = OpenAIStream(response);

// const resp = new StreamingTextResponse(stream);

// console.log("RESPONSE", resp);
