"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGenTranslationsMutation } from "@/domain/content/use-gen-translations-mutation";
import { cn } from "@/lib/utils";
import { useGetContentId } from "./[content-id]/hooks/use-get-content-id";

export const ContentTranscriptionSettings = () => {
  const contentId = useGetContentId();
  const genTranslationsMutation = useGenTranslationsMutation();

  return (
    <div className="my-4">
      <Label className="text-[16px] text-gray-500 mb-4 block">
        Regenerate all translations for this content.
      </Label>
      <p className="text-sm text-gray-400 mb-6">
        This will re-process all transcriptions and regenerate their
        translations. This action cannot be undone.
      </p>
      <Button
        variant={"outline"}
        disabled={genTranslationsMutation.isPending}
        className={cn(
          genTranslationsMutation.isPending ? "text-gray-500" : "",
          "uppercase rounded-full",
        )}
        onClick={() => {
          genTranslationsMutation.mutateAsync({
            contentId,
          });
        }}
      >
        {genTranslationsMutation.isPending
          ? "Regenerating..."
          : "Regenerate Translations"}
      </Button>
    </div>
  );
};
