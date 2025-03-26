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
  const { variants, setVariants } = useMandarinoAi() as any;

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
      ) : !variants?.length ? (
        <Nothing message="No ai found" icon={Icons.ai} className="my-8 mt-16" />
      ) : (
        <div className="grid sm:grid-cols-2 p-4 grid-cols-1 gap-4">
          {variants?.map((variant: any) => {
            return (
              <section
                className=" bg-gray-50 p-4 rounded"
                key={JSON.stringify(variant)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-bold">{variant?.variant}</h2>
                  <button
                    onClick={() => {
                      setVariants((prev: any) =>
                        prev.filter(
                          (item: any) => item?.apiKey !== variant.apiKey
                        )
                      );
                    }}
                    className="text-xl text-gray-300 hover:text-black transtion"
                  >
                    <Icons.xMark />
                  </button>
                </div>

                <p className="mt-4">{variant.apiKey?.slice(0, 16)}...</p>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
