/**
 * The bytes of a subtitle file, as the reader API takes them.
 *
 * The reader parses a subtitle file in the browser, but the file itself is what
 * the API keeps — the source of the lines, and the only copy of the times if the
 * text is ever rebuilt from it. It travels as base64 inside the same request
 * that saves the text, which is the one shape a JSON body has for bytes.
 *
 * `btoa` takes one string, and a subtitle file is big enough to blow the
 * argument limit of `String.fromCharCode` if it is handed over whole, so the
 * bytes are turned into characters a chunk at a time.
 */
const CHUNK_SIZE = 0x8000;

export const encodeReaderSubtitleFile = (bytes: Uint8Array) => {
  let binary = "";

  for (let index = 0; index < bytes.length; index += CHUNK_SIZE) {
    binary += String.fromCharCode(
      ...bytes.subarray(index, index + CHUNK_SIZE),
    );
  }

  return btoa(binary);
};
