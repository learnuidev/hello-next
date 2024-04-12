import { listSubtitles } from "@/libs/youtube/list-subtitles";

import OpenAI from "openai";
// @ts-ignore
// import MistralClient from "@mistralai/mistralai";
// import { mistralConfig } from "@/libs/mistral/mistral-config";

import { openaiConfig } from "@/libs/openai/openai.config";

const openai = new OpenAI({
  apiKey: openaiConfig?.apiKey,
});
export const maxDuration = 60;

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { query } = await req.json();

  const prompt = `

  Given a text, please classify into the following:
    - Country
    - Company
    - Fruit
    - Person
    - Vehicle
    - Programming Language
    - Keyword
    - Query
    - History
    - Travel Plans
    - Request
    - Song
    - Financial Statements

If you think the text belongs to multiple classes, then please return all the multiple classes

For example:
Input: Apple
Output: Company,Fruit

Input: Huawei
Output: Company

Input: Who is the current prime minister of Bhutan
Output: Query


   
   `;
  const chatCompletion = (await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
      { role: "user", content: `content: ${query}` },
    ],
    model: "gpt-3.5-turbo",
  })) as any;

  // // 1. Download video
  const resp = chatCompletion?.choices?.[0]?.message?.content;
  // return subtitles;

  return Response.json(resp);
}
