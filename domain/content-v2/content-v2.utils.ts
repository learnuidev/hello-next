import { AudioTranscription, TranscriptionV2 } from "./content-details.types";

export function isAudioTranscription(
  transcription: TranscriptionV2
): transcription is AudioTranscription {
  return "words" in transcription;
}
