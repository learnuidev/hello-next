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

  let firstMessage = {
    role: "system",
    content: `
    You are an expert summarizer, given context, return its information.
    For example for 一, it should return:

    Okay, here is the information about the number "one" in English:

    ## The Number "One" in English
    "One" is the cardinal number representing a single unit or the first in a series.
    It is the most basic and fundamental number in the English number system.
    
    ## Numerical Representation
    The written form is "one"
    The numerical symbol is "1"

    Usage
    Used to indicate a single item or person
    Can function as a noun (e.g. "I have one apple"), adjective (e.g. "I have one apple"), or pronoun (e.g. "Give me one")
    Used in ordinal numbers to indicate the first position (e.g. "first")
    Idioms and Expressions
    "All in one" - everything combined into a single unit
    "At one" - in agreement or harmony
    "In one's own right" - by one's own merit
    "Of one mind" - sharing the same opinion
    So in summary, the number "one" is the fundamental building block of the English number system, with important numerical, grammatical, and idiomatic uses. Its simplicity belies its significance in the language.`,
  };

  // const firstMessage = messages[0];

  firstMessage;

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: [firstMessage, messages],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
