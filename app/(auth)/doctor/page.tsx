"use client";

import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons.v2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCurrentAuthUser,
  useIsSuperAdmin,
} from "@/domain/auth/auth.queries";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { CharacterAndToneLevel } from "./character-and-tone-level/character-and-tone-level";
import { Language } from "./language/language";
import { UndiscoveredComponents } from "./undiscovered-components/undiscovered-components";
import { ContentWithS3Translations } from "./content-with-s3-translations/content-with-s3-translations";

export default function Doctor() {
  const { data: components } = useListComponents({});

  const { data: characters } = useListCharactersQuery({});

  const updateCharacter = useUpdateCharacterStatusMutation();

  const characterWithOutGroupAndToneLevel = characters
    ?.filter((char) => !char?.tone_level && char?.hanzi?.length === 1)
    .map((char) => {
      const comp = components?.find((c) => c?.hanzi === char?.hanzi);
      return {
        characterId: char.id,
        hanzi: char.hanzi,
        lang: char?.lang || comp?.lang,
        tone_level: comp?.tone_level,
        group: char.group || comp?.group,
      };
    })
    ?.filter((char) => char?.lang === "zh")
    ?.slice(0, 100);

  const mutateAll = async () => {
    if (characterWithOutGroupAndToneLevel !== undefined) {
      return Promise.all(
        characterWithOutGroupAndToneLevel?.map(async (char) => {
          // @ts-ignore
          return updateCharacter.mutateAsync(char);
        })
      );
    }

    return null;
  };

  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return (
      <Card className="text-center mt-32 py-32 mx-auto max-w-5xl">
        <Icons.infoCircle />
        <p className="text-xl">
          You dont have the permission to view this page{" "}
        </p>
      </Card>
    );
  }

  return (
    <div className="mt-8 md:mx-12">
      <h1>Dr. Mando</h1>

      <Tabs defaultValue="tone-level" className="p-0">
        <div className="mt-8 flex justify-between items-center">
          <TabsList className="space-x-8">
            <TabsTrigger
              value="tone-level"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              <Icons.musicNote className="text-2xl" />
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              <Icons.language className="text-2xl" />
            </TabsTrigger>
            <TabsTrigger
              value="undiscovered"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              Undiscovered
            </TabsTrigger>
            <TabsTrigger
              value="content-with-s3"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              Content without S3
            </TabsTrigger>
          </TabsList>

          <div className="space-x-4"></div>
        </div>

        <TabsContent value="tone-level" className="my-8">
          <CharacterAndToneLevel />
        </TabsContent>
        <TabsContent value="search" className="my-8">
          <Language />
        </TabsContent>
        <TabsContent value="click" className="my-8"></TabsContent>
        <TabsContent value="undiscovered" className="my-8">
          <UndiscoveredComponents />
        </TabsContent>
        <TabsContent value="content-with-s3" className="my-8">
          <ContentWithS3Translations />
        </TabsContent>
      </Tabs>
    </div>
  );
}
