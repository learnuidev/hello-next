import { ElevenLabsClient } from "elevenlabs";

export const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY, // Defaults to process.env.ELEVENLABS_API_KEY
});
