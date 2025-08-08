import chineseFlag from "./chinese.webp";
import ukFlag from "./uk.png";
import frenchFlag from "./fr.png";
import spanishFlag from "./es.webp";
import romanianFlag from "./romanian.webp";
import japaneseFlag from "./jp.png";
import germanFlag from "./german.webp";
import russianFlag from "./russian.webp";
import iranFlag from "./fa.webp";
import palestineFlag from "./ar.png";
import kazakFlag from "./kazak.webp";
import nepaliFlag from "./ne.png";
import indianFlag from "./hi.png";
import pakistanFlag from "./pk.png";
// import koreanFlag from "./ko.webp";
import koreanFlag from "./nko.png";

export interface ILanguage {
  shortId: string;
  id: string;
  title: string;
  src: string;
}

export const languages: ILanguage[] = [
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
  {
    shortId: "ru",
    id: "ru-RU",
    title: "Russian",
    src: russianFlag.src,
  },
  {
    shortId: "de",
    id: "de-DE",
    title: "German",
    src: germanFlag.src,
  },
  {
    shortId: "fa",
    id: "fa-FA",
    title: "Persian",
    src: iranFlag.src,
  },
  {
    shortId: "ar",
    id: "ar-AR",
    title: "Arabic",
    src: palestineFlag.src,
  },
  {
    shortId: "ne",
    id: "ne-NE",
    title: "Nepali",
    src: nepaliFlag.src,
  },
  {
    shortId: "hi",
    id: "hi-HI",
    title: "Hindi",
    src: indianFlag.src,
  },
  {
    shortId: "ur",
    id: "ur-UR",
    title: "Urdu",
    src: pakistanFlag.src,
  },
  {
    shortId: "kz",
    id: "kz-KZ",
    title: "Kakaz",
    src: kazakFlag.src,
  },
  {
    shortId: "ko",
    id: "ko-KO",
    title: "Korean",
    src: koreanFlag.src,
  },
];
