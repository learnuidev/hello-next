import { createIndexDBStore } from "@/libs/index-db/index-db";
import { mandarinoApi } from "mandarino";

export const useMandarinoAiStore = createIndexDBStore({
  name: "mandarino-ai-store",
  handler: (set: any, get: any) => ({
    variants: [],
    setVariants: (f: any) =>
      typeof f === "function"
        ? set({ variants: f(get().variants) })
        : set({ variants: f }),
  }),
});

export const useMandarinoAi = () => {
  const variants = useMandarinoAiStore((state) => state.setVariants);
  const setVariants = useMandarinoAiStore((state) => state.setVariants);

  return { variants, setVariants };
};

const getVariant = (variants: any, key: string) => {
  return variants.find((v: any) => v.variant === key);
};

export const useAiProviders = () => {
  const { variants } = useMandarinoAi();

  const aiProviders = [
    { variant: "openai" },
    { variant: "moonshot" },
    { variant: "deepseek" },
    { variant: "qwen" },
    { variant: "mistral" },
  ].map((item) => {
    const env = getVariant(variants, item.variant);

    if (!env) {
      return null;
    }
    const client = mandarinoApi(env);

    return {
      ...item,
      client,
    };
  });

  return {
    aiProviders,
  };
};
