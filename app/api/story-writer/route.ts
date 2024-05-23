import { nineTwoOneData, nineTwoOneReturns } from "@/libs/921/lang";
import { postProcess } from "@/libs/921/post-process";
import { listSubtitles } from "@/libs/youtube/list-subtitles";

import OpenAI from "openai";

import { openaiConfig } from "@/libs/openai/openai.config";

const openai = new OpenAI({
  apiKey: openaiConfig?.apiKey,
});

export const maxDuration = 60;

const narratorPlaceholder = `{{narrator}}`;
const nomadPlaceholder = `{{nomad}}`;
const themePlaceholder = `{{main-theme}}`;
const locationPlaceholder = `{{location}} `;
const destinationPlaceholder = `{{destination}}`;
const componentsPlaceholder = `{{components}}`;

const storyPrompt = `
     You are an expert story teller. Write a story using ${narratorPlaceholder}'s style. ${themePlaceholder}
     The main traveller ${nomadPlaceholder} is at ${locationPlaceholder} ${destinationPlaceholder}. 

     Key components in this story are: ${componentsPlaceholder}
     


`;
// const storyPrompt = `
//      You are an expert story teller. Write a story using ${narratorPlaceholder}'s style. ${themePlaceholder}
//      The main traveller ${nomadPlaceholder} is at ${locationPlaceholder} ${destinationPlaceholder}.

//      Key components in this story are: ${componentsPlaceholder}

//      Note:
//      Keep the story short (under 100 words) and suitable for Kids under 5 year olds.

// `;

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { narrator, nomad, theme, destination, location, components } =
    await req.json();

  const resolvedPrompt = storyPrompt
    .replace(narratorPlaceholder, narrator)
    .replace(themePlaceholder, theme)
    .replace(componentsPlaceholder, components)
    .replace(nomadPlaceholder, nomad)
    .replace(destinationPlaceholder, destination)
    .replace(locationPlaceholder, locationPlaceholder);

  const storyCompletion = (await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: resolvedPrompt,
      },
      // { role: "user", content: `content: ${query}` },
    ],
    model: "gpt-3.5-turbo",
  })) as any;

  // // 1. Download video
  const story = storyCompletion?.choices?.[0]?.message?.content;

  // return subtitles;

  return Response.json({ story });
}
