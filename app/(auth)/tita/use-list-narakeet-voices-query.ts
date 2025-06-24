"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQuery } from "@tanstack/react-query";

const cachedVoices = [
  {
    name: "baihe",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "bo",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "chao",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "cheng",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "daoming",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "dawei",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "hai",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal"],
  },
  {
    name: "hanyu",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "hetang",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "hua",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "jianbin",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "jianhua",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "jing",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "jueming",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "kaige",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal"],
  },
  {
    name: "lihua",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa", "x-sampa"],
  },
  {
    name: "liying",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "luodan",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "mei",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "meilan",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal"],
  },
  {
    name: "mengyao",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "quan",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "shishi",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "shuang",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "wei",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "xiaoming",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "xinyan",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "xinyi",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "xiulan",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal"],
  },
  {
    name: "yifei",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "yuqi",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "zihan",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
  {
    name: "ziwen",
    language: "Chinese (Mandarin)",
    languageCode: "cmn-CN",
    styles: ["literal", "normal", "ipa"],
  },
];

export const useListNarakeetVoicesQuery = ({ lang }: { lang: string }) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any, any, any>({
    queryKey: ["list-narakeet-voices", authUser?.jwt, lang],
    queryFn: async () => {
      if (lang === "cmn-CN") {
        return cachedVoices;
      }
      const voices = await fetch("/api/list-narakeet-voices", {
        method: "POST",

        body: JSON.stringify({
          lang,
        }),

        headers: {
          Authorization: `${authUser?.jwt}`,
        },
      });

      if (!voices.ok) {
        throw Error(voices.statusText);
      }

      return voices.json();
    },
  });
};
