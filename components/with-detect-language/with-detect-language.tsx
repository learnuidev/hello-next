import { Nothing } from "@/app/nmm/nothing";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { useDetectLanguageQuery } from "./use-detect-language-query";
import Link from "next/link";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

const supportedLangs = [
  "fr",
  "es",
  "zh",
  "en",
  "ro",
  "fa",
  "ko",
  "ar",
  "it",
  "ru",
  "hi",
  "ur",
];

export function WithDetectLanguage({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  const lang = useGetCurrentLang();

  const { data, isLoading } = useDetectLanguageQuery(content, lang);

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  if (!data) {
    return null;
  }

  if (data?.lang !== undefined && supportedLangs?.includes(data?.lang)) {
    return children;
  }

  return (
    <>
      <Nothing message="Language not supported. Sry" />

      <Link href="/nmm" className="text-center block">
        Back
      </Link>
    </>
  );
}
