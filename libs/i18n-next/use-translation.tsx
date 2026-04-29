import { Namespace } from "i18next";
import {
  useTranslation as useReactI18nTranslation,
  UseTranslationOptions,
} from "react-i18next";
import { _DefaultNamespace } from "react-i18next/TransWithoutContext";

// @ts-ignore
function useTranslation<NS extends Namespace = _DefaultNamespace>(
  namespace?: NS,
  options?: UseTranslationOptions<undefined>,
) {
  const translationResult = useReactI18nTranslation(namespace, options);

  return translationResult;
}

export { useTranslation };
