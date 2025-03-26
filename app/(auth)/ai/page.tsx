"use client";

import { useMandarinoAi } from "@/hooks/use-ai-providers";
import { ProviderForm } from "./components/provider-form";
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { useState } from "react";

type Provider = "openai" | "moonshot" | "deepseek" | "qwen" | "mistral";

type ProviderData = {
  variant: Provider;
  apiKey: string;
};

export default function AiProviders() {
  const [addVariant, setAddVariant] = useState(false);
  const { variants } = useMandarinoAi() as any;

  return (
    <div>
      <div className="flex justify-between items-center px-4 mt-8">
        <h1 className="text-center font-bold text-xl">Ai Providers</h1>

        {addVariant ? (
          <button
            onClick={() => {
              setAddVariant(false);
            }}
          >
            <Icons.xMark />
          </button>
        ) : (
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                setAddVariant(true);
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>

      {addVariant ? (
        <div className="mt-8">
          <ProviderForm />
        </div>
      ) : variants?.length ? (
        <Nothing message="No ai found" icon={Icons.ai} className="my-8 mt-16" />
      ) : (
        variants?.map((variant: any) => {
          <section>
            <h2>{variant.provider}</h2>
          </section>;
        })
      )}
    </div>
  );
}
