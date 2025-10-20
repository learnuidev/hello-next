import { Nothing } from "@/app/nmm/nothing";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { useDetectLanguageQuery } from "./use-detect-language-query";
import Link from "next/link";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { AnimatedLoadingText } from "../animated-loading-text";

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
  "ja",
  "fr-FR",
  "es-ES",
  "ro-RO",
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
    return (
      <div className="w-full flex items-center justify-center mt-32">
        <AnimatedLoadingText
          className="text-xl font-extralight"
          message="Detecting Language..."
        />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // if (data?.lang !== undefined && supportedLangs?.includes(data?.lang)) {

  if (data?.lang !== undefined) {
    return children;
  }

  return (
    <>
      <Nothing message="Language not supported." />

      <Link href="/convos" className="text-center block">
        Back
      </Link>
    </>
  );
}
