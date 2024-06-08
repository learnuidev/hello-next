"use client";

import React from "react";
import { useListSubComponentsQuery } from "@/domain/component/component.queries";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

import { persianAlphabets } from "@/langs/persian/persian-alphabets";
import { urduAlphabets } from "@/langs/urdu/urdu-alphabets";
import { russianAlphabets } from "@/langs/russian/russian-alphabets";
import { hiraganaAlphabets } from "@/langs/japanese/hiragana-alphabets";
import { japaneseComponents2 } from "@/langs/japanese/japanese-components";
import { koreanAlphabets } from "@/langs/korean/korean-alphabets";
import { koreanComponents2 } from "@/langs/korean/korean-components";
import { arabicAlphabets } from "@/langs/arabic/arabic-alphabets";

interface SelectedCharacterProps {
  characterId: string;
  lang: string;
}

const HanziSubComponentsView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const { data: sub_components, isLoading } = useListSubComponentsQuery({
    componentId: characterId,
  });

  if (isLoading) {
    return <Skeleton className="w-60 h-12" />;
  }

  if (characterId?.length === 1) {
    return (
      <div className="text-gray-500 flex space-x-4">
        {/* {JSON.stringify(sub_components, null, 2)} */}
        {sub_components?.map((comp: { hanzi: string; en: string }) => {
          return (
            <Link
              key={comp?.hanzi}
              className="space-x-2 flex"
              href={`/nmm/${comp?.hanzi}?lang=zh`}
            >
              <p>{comp?.hanzi}</p>
              <p className="text-gray-400">{comp?.en}</p>
            </Link>
          );
        })}
      </div>
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
    <div className="text-gray-500 flex space-x-4 my-8">
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
    </div>
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
    <div className="text-gray-500 flex space-x-4 my-8">
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
    </div>
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
    <div className="text-gray-500 flex space-x-4 my-8">
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
    </div>
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
    <div className="text-gray-500 flex space-x-4 my-8">
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
    </div>
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
    <div className="text-gray-500 flex space-x-4 my-8">
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
    </div>
  );
};

const ArabicSubComponentView = ({
  characterId,
  lang,
}: SelectedCharacterProps) => {
  const subComponents = characterId.split("")?.map((comp: any) => {
    const alphabet = arabicAlphabets?.find((item) => item?.input === comp);
    return {
      ...alphabet,
    };
  });
  return (
    <div className="text-gray-500 flex space-x-4 my-8">
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
    </div>
  );
};

export const SubComponentsView = (props: SelectedCharacterProps) => {
  if (props.lang === "zh") {
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
