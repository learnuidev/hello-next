import { NewConvoInput } from "../../new-convo/new-convo-input";
import { ContentTitleInput } from "../components/content-title-input";
import { LangAndContentTypeSelector } from "../components/lang-content-type-selector";

export const TextFlow = () => {
  return (
    <div>
      <ContentTitleInput />
      <div className="w-full">
        <LangAndContentTypeSelector />
      </div>

      <NewConvoInput />
    </div>
  );
};
