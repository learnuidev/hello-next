export interface CompatibleCharacter {
  character: string;
  pinyin: string | null;
  meaning: string | null;
  position: string | null;
}

export interface CompatibleRadical {
  radical: string;
  meaning: string | null;
  // Where the radical sits in the queried character: left, right, top, bottom…
  position: string | null;
  count: number;
  compatibles: CompatibleCharacter[];
}

export interface ListCompatiblesResponse {
  characterId: string;
  parts: CompatibleRadical[];
}
