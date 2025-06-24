import Link from "next/link";
import { languages } from "./languages";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { allLangs } from "@/data/agenda";

export const listLanguagesShortCuts = [
  "list langauges",
  "list languages",
  "list langs",
  "langs",
  "ll",
];

export const useListLanguages = () => {
  const { data: components } = useListComponents();
  const { data: characters } = useListCharactersQuery();

  const langs = [
    ...(new Set(
      [...(characters || []), ...(components || [])]?.map((x) => x?.lang)
    ) as any),
  ]
    ?.filter(Boolean)
    .map((lang: string) => {
      return {
        id: lang,
        label: lang,
      };
    })
    ?.filter((language2) => {
      const language = languages?.find((lang) => lang?.id === language2?.id);
      return language;
    })
    .map((language2) => {
      const language =
        languages?.find((lang) => lang?.id === language2?.id) || language2;

      return language;
    });

  if (!langs?.length) {
    return allLangs;
  }
  return langs;
};

export const LanguagesList = ({ characterId }: { characterId: string }) => {
  const characterIdTitles = {
    ll: "List Languages",
  } as any;

  const langs = useListLanguages();
  return (
    <div>
      <h1 className="text-xl text-gray-500 my-12 font-light">
        {characterIdTitles?.[characterId] || characterId}
      </h1>

      <div className="grid gap-4 md:gap-8 items-center grid-cols-1 sm:grid-cols-4">
        {langs.map((language) => {
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
