"use client";

import React from "react";
import { useListSubComponentsQuery } from "@/domain/component/component.queries";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import { persianAlphabets } from "@/langs/persian/persian-alphabets";
import { urduAlphabets } from "@/langs/urdu/urdu-alphabets";
import { russianAlphabets } from "@/langs/russian/russian-alphabets";
import { hiraganaAlphabets } from "@/langs/japanese/hiragana-alphabets";
import { japaneseComponents2 } from "@/langs/japanese/japanese-components";
import { koreanAlphabets } from "@/langs/korean/korean-alphabets";
import { koreanComponents2 } from "@/langs/korean/korean-components";
import { arabicAlphabets } from "@/langs/arabic/arabic-alphabets";
import { useListComponents } from "@/domain/lesson/component.queries";

interface SelectedCharacterProps {
  characterId: string;
  lang: string;
}

const SubComponentContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-gray-500 flex space-x-4 my-4 overflow-y-auto pb-4">
      {children}
    </div>
  );
};

const HanziSubComponentsView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const { data: components } = useListComponents();
  const { data: sub_components, isLoading } = useListSubComponentsQuery({
    componentId: characterId,
  });

  if (isLoading) {
    return <Skeleton className="w-60 h-12" />;
  }

  if (characterId?.length === 1) {
    return (
      <SubComponentContainer>
        {sub_components?.map((comp: { hanzi: string; en: string }) => {
          const component = components?.find(
            (component) => component?.hanzi === comp?.hanzi
          );
          return (
            <Link
              key={comp?.hanzi}
              className="space-x-2 flex"
              href={`/nmm/${comp?.hanzi}?lang=zh`}
            >
              <p>{comp?.hanzi}</p>
              <p className="text-gray-400 truncate">
                {comp?.en || component?.en}
              </p>
            </Link>
          );
        })}
      </SubComponentContainer>
    );
  }
};

const FarsiSubComponentView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const subComponents = characterId.split("")?.map((comp: any) => {
    const alphabet = persianAlphabets?.find((item) => item?.input === comp);
    return {
      ...alphabet,
    };
  });
  return (
    <SubComponentContainer>
      {subComponents?.map((item: any) => {
        return (
          <Link
            key={item?.input}
            className="space-x-2 flex"
            href={`/nmm/${item?.input}?lang=${lang}`}
          >
            <p>{item?.input}</p>
            <p className="text-gray-400">{item?.roman}</p>
          </Link>
        );
      })}
    </SubComponentContainer>
  );
};

const UrduSubComponentView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const subComponents = characterId.split("")?.map((comp: any) => {
    const alphabet = urduAlphabets?.find((item) => item?.input === comp);
    return {
      ...alphabet,
    };
  });
  return (
    <SubComponentContainer>
      {subComponents?.map((item: any) => {
        return (
          <Link
            key={item?.input}
            className="space-x-2 flex"
            href={`/nmm/${item?.input}?lang=${lang}`}
          >
            <p>{item?.input}</p>
            <p className="text-gray-400">{item?.roman}</p>
          </Link>
        );
      })}
    </SubComponentContainer>
  );
};

const RussianSubComponentView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const subComponents = characterId.split("")?.map((comp: any) => {
    const alphabet = russianAlphabets?.find((item) => item?.input === comp);
    return {
      ...alphabet,
    };
  });
  return (
    <SubComponentContainer>
      {subComponents?.map((item: any) => {
        return (
          <Link
            key={item?.input}
            className="space-x-2 flex"
            href={`/nmm/${item?.input}?lang=${lang}`}
          >
            <p>{item?.input}</p>
            <p className="text-gray-400">{item?.roman}</p>
          </Link>
        );
      })}
    </SubComponentContainer>
  );
};
const JapaneseSubComponentView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const subComponents = characterId.split("")?.map((comp: any) => {
    const alphabet = [...hiraganaAlphabets, ...japaneseComponents2].find(
      (item) => item?.input === comp
    );
    return {
      ...alphabet,
    };
  });
  return (
    <SubComponentContainer>
      {subComponents?.map((item: any) => {
        return (
          <Link
            key={item?.input}
            className="space-x-2 flex"
            href={`/nmm/${item?.input}?lang=${lang}`}
          >
            <p>{item?.input}</p>
            <p className="text-gray-400">{item?.roman}</p>
          </Link>
        );
      })}
    </SubComponentContainer>
  );
};

const KoreanSubComponentView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const subComponents = characterId.split("")?.map((comp: any) => {
    const alphabet = [...koreanAlphabets, ...koreanComponents2].find(
      (item) => item?.input === comp
    );
    return {
      ...alphabet,
    };
  });
  return (
    <SubComponentContainer>
      {/* {JSON.stringify(sub_components, null, 2)} */}
      {subComponents?.map((item: any) => {
        return (
          <Link
            key={item?.input}
            className="space-x-2 flex"
            href={`/nmm/${item?.input}?lang=${lang}`}
          >
            <p>{item?.input}</p>
            <p className="text-gray-400">{item?.roman}</p>
          </Link>
        );
      })}
    </SubComponentContainer>
  );
};

const ArabicSubComponentView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const subComponents = characterId.split("")?.map((comp: any) => {
    const alphabet = [...arabicAlphabets, ...koreanComponents2].find(
      (item) => item?.input === comp
    );
    return {
      ...alphabet,
    };
  });

  return (
    <SubComponentContainer>
      {subComponents?.map((item: any) => {
        return (
          <Link
            key={item?.input}
            className="space-x-2 flex"
            href={`/nmm/${item?.input}?lang=${lang}`}
          >
            <p>{item?.input}</p>
            <p className="text-gray-400">{item?.roman}</p>
          </Link>
        );
      })}
    </SubComponentContainer>
  );
};

export const SubComponentsView = (props: SelectedCharacterProps) => {
  if (!props.lang || props.lang === "zh") {
    return <HanziSubComponentsView {...props} />;
  }

  if (props.lang === "fa" && props?.characterId?.length > 1) {
    return <FarsiSubComponentView {...props} />;
  }

  if (props.lang === "ur" && props?.characterId?.length > 1) {
    return <UrduSubComponentView {...props} />;
  }
  if (props.lang === "ru") {
    return <RussianSubComponentView {...props} />;
  }
  if (props.lang === "ja") {
    return <JapaneseSubComponentView {...props} />;
  }
  if (props.lang === "ko") {
    return <KoreanSubComponentView {...props} />;
  }

  if (props.lang === "ar" && props?.characterId?.length > 1) {
    return <ArabicSubComponentView {...props} />;
  }

  return null;
};
