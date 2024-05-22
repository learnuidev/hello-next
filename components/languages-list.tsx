import Link from "next/link";
import { languages } from "./languages";

export const listLanguagesShortCuts = [
  "list langauges",
  "list languages",
  "list langs",
  "langs",
  "ll",
];

export const LanguagesList = ({ characterId }: { characterId: string }) => {
  const characterIdTitles = {
    ll: "List Languages",
  } as any;

  return (
    <div>
      <h1 className="text-xl text-gray-500 my-12 font-light">
        {characterIdTitles?.[characterId] || characterId}
      </h1>

      <div className="grid gap-4 md:gap-8 items-center grid-cols-1 sm:grid-cols-4">
        {languages?.map((language) => {
          return (
            <Link
              className="hover:scale-105 transition text-xl md:text-3xl text-gray-400 hover:text-white font-extralight"
              href={`/nmm?lang=${language.id}`}
              key={language?.id}
            >
              {language?.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
