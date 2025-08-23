import { NewConvoInput } from "../../new-convo/new-convo-input";
import { LangAndContentTypeSelector } from "../components/lang-content-type-selector";

export const TextFlow = () => {
  return (
    <div>
      <div className="w-full">
        <LangAndContentTypeSelector />
      </div>

      <NewConvoInput />
    </div>
  );
};
