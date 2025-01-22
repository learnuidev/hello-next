import chineseFlag from "./chinese.webp";
import ukFlag from "./uk.png";
import frenchFlag from "./fr.png";
import spanishFlag from "./es.webp";
import romanianFlag from "./romanian.webp";
import japaneseFlag from "./jp.png";

export const languages = [
  {
    shortId: "zh",
    id: "zh-CN",
    title: "Chinese",
    src: chineseFlag.src,
  },
  {
    shortId: "en",
    id: "en",
    title: "English",
    src: ukFlag.src,
  },
  {
    shortId: "fr",
    id: "fr-FR",
    title: "French",
    src: frenchFlag.src,
  },
  {
    shortId: "es",
    id: "es-ES",
    title: "Spanish",
    src: spanishFlag.src,
  },
  {
    shortId: "ro",
    id: "ro-RO",
    title: "Romaninan",
    src: romanianFlag.src,
  },
  {
    shortId: "ja",
    id: "ja-JA",
    title: "Japanese",
    src: japaneseFlag.src,
  },
];
