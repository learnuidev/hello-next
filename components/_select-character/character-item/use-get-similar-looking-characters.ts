import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";

export const useGetSimilarLookingCharacters = (hanzi: string) => {
  const { data: componentVariants } = useListComponentVariantsQuery({
    hanzi,
  });

  return componentVariants?.[0]?.similarLookingCharacters?.characters || [];
};
