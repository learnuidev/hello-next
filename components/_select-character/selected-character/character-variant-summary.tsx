import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";
import { useGetSelectedCharacterParams } from "./use-get-selected-character-params";

export const CharacterVariantSummary = () => {
  const { variant, characterId } = useGetSelectedCharacterParams();

  const { data: variants } = useListComponentVariantsQuery({
    hanzi: characterId,
  });

  const selectedVariant = variants?.filter(
    (v: any) => v?.pinyin === variant
  )?.[0] as any;

  return (
    <div>
      {/* <h1 className="text-4xl font-bold">{variant}</h1> */}

      {selectedVariant?.useCases?.length > 0 && (
        <div>
          <h2 className="text-2xl my-8 text-gray-400">Use Cases</h2>

          <div className="space-y-8">
            {selectedVariant?.useCases?.map((useCase: any) => {
              return (
                <div key={JSON.stringify(useCase)}>
                  <h3 className="text-2xl font-bold mb-8">{useCase?.en}</h3>

                  <div className="my-4 space-y-4">
                    {useCase?.sentences?.map((sentence: any) => {
                      return (
                        <div key={JSON.stringify(sentence)}>
                          <p className="font-light text-gray-300">
                            {sentence?.pinyin}
                          </p>
                          <p className="text-2xl">{sentence?.hanzi}</p>
                          <p className="font-extralight text-gray-400">
                            {sentence?.en}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedVariant?.similarLookingCharacters?.characters?.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl my-8 text-gray-400">
            Similar Looking Characters
          </h2>

          <div className="flex flex-row gap-8">
            {selectedVariant?.similarLookingCharacters?.characters?.map(
              (sentence: any) => {
                return (
                  <div
                    className="my-4 space-y-2"
                    key={JSON.stringify(sentence)}
                  >
                    <div
                      key={JSON.stringify(sentence)}
                      className="flex items-center flex-col"
                    >
                      <p>{sentence?.pinyin}</p>
                      <p className="text-2xl">{sentence?.hanzi}</p>
                      <p>{sentence?.en}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* <div>
        <code>
          <pre>{JSON.stringify(selectedVariant, null, 4)}</pre>
        </code>
      </div> */}
    </div>
  );
};
