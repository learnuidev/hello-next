import { ContentTypeSelector } from "./content-type-selector";
import { LanguageSelector } from "./language-selector";

export const LangAndContentTypeSelector = () => {
  return (
    <div className="grid sm:grid-cols-2 sm:gap-8 gap-0 grid-cols-1">
      <LanguageSelector />
      <ContentTypeSelector />
    </div>
  );
};
