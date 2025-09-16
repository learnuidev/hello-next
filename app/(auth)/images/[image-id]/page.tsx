"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

import { useExtractImageQuery } from "@/domain/character-contents/use-extract-image-mutation";
import { useGetImageParams } from "./hooks/use-get-image-params";
import { getNmmLink } from "@/libs/utils/get-nmm-link";

import { Icons } from "@/components/ui/icons.v2";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CurrentTranscriptionView } from "../../convos/audiobook-player/components/current-transcription-view";

//
// ----------------------------
// Custom Hooks
// ----------------------------
function useImageExplorer(details: any[] | undefined) {
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = details?.length || 0;

  const goToPrevious = useCallback(() => {
    if (!total) return;
    setCurrentIndex((i) => (i > 0 ? i - 1 : total - 1));
  }, [total]);

  const goToNext = useCallback(() => {
    if (!total) return;
    setCurrentIndex((i) => (i < total - 1 ? i + 1 : 0));
  }, [total]);

  const openExplorer = (index: number) => {
    setCurrentIndex(index);
    setIsExplorerOpen(true);
  };

  // keyboard navigation
  useEffect(() => {
    if (!isExplorerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") goToPrevious();
      if (e.code === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isExplorerOpen, goToPrevious, goToNext]);

  return {
    isExplorerOpen,
    setIsExplorerOpen,
    currentIndex,
    currentItem: details?.[currentIndex],
    total,
    goToPrevious,
    goToNext,
    openExplorer,
  };
}

//
// ----------------------------
// Small Components
// ----------------------------
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LottieLoadingAnimation />
    </div>
  );
}

function Header() {
  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6 py-4">
        <Link href="/images">
          <Button variant="ghost" size="sm" className="gap-2">
            <Icons.back className="w-4 h-4" />
            Back to Images
          </Button>
        </Link>
      </div>
    </div>
  );
}

function ImagePreview({ src }: { src?: string }) {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-video relative bg-muted/10">
          <img
            src={src || "/placeholder.svg"}
            alt="Extracted image content"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ImageInfo({
  imageId,
  count,
}: {
  imageId: string | undefined;
  count: number;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-3">Image Information</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Image ID:</span>
            <Badge variant="secondary" className="font-mono text-xs">
              {imageId || "demo-image"}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Extracted Items:</span>
            <Badge variant="outline">{count} items</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ExtractedItem({
  metadata,
  onFocus,
}: {
  metadata: any;
  onFocus: () => void;
}) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02] group-hover:border-primary/50">
      <CardContent className="p-6">
        <div className="space-y-3">
          {metadata?.pinyin && (
            <div className="text-sm font-medium text-primary">
              {metadata.pinyin}
            </div>
          )}
          <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
            {metadata?.hanzi || metadata?.input}
          </div>
          {metadata?.en && (
            <div className="text-base text-muted-foreground leading-relaxed">
              {metadata.en}
            </div>
          )}
          <button
            onClick={onFocus}
            className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-primary transition-colors cursor-pointer"
          >
            <span>Focus</span>
            <Icons.glassesRound className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyFallback() {
  return (
    <Card className="border-dashed">
      <CardContent className="p-12 text-center">
        <div className="text-muted-foreground">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="font-semibold mb-2">No content extracted</h3>
          <p className="text-sm">
            {`This image doesn't contain any extractable text or characters.`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Explorer({
  onClose,
  onPrev,
  onNext,
  index,
  total,
  current,
}: {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  index: number;
  total: number;
  current: any;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="gap-2"
            >
              <Icons.back className="w-4 h-4" /> Close Explorer
            </Button>
            <div className="text-sm text-muted-foreground">
              {index + 1} of {total}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrev}
              disabled={index === 0}
            >
              <Icons.back className="w-4 h-4" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              disabled={index === total - 1}
            >
              Next <Icons.front className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                <CurrentTranscriptionView
                  containsChinglish={false}
                  currentTranscription={{
                    ...current,
                    input: current?.input || current?.hanzi,
                    lang: "zh",
                  }}
                  lang={"zh"}
                />
                <div className="pt-8">
                  <Link
                    target="_blank"
                    href={getNmmLink({
                      id: current?.hanzi || current?.input,
                      lang: "zh",
                    })}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
                  >
                    Learn more <Icons.externalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

//
// ----------------------------
// Main Component
// ----------------------------
export default function ImageDetails() {
  const { imageId } = useGetImageParams();
  const { data, isLoading } = useExtractImageQuery(imageId);

  const {
    isExplorerOpen,
    setIsExplorerOpen,
    currentIndex,
    currentItem,
    total,
    goToPrevious,
    goToNext,
    openExplorer,
  } = useImageExplorer(data?.imageMetadata?.details);

  if (isLoading) return <LoadingScreen />;

  const details = data?.imageMetadata?.details || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />

      <div className="container mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <ImagePreview src={data?.sourceUrl} />
          <ImageInfo imageId={imageId} count={details.length} />
        </div>

        <div className="space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Extracted Content
            </h2>
            <p className="text-muted-foreground">
              Click on any item to learn more about the characters and their
              meanings.
            </p>
          </div>

          <div className="space-y-3">
            {details.length > 0 ? (
              details.map((metadata, idx) => (
                <ExtractedItem
                  key={idx}
                  metadata={metadata}
                  onFocus={() => openExplorer(idx)}
                />
              ))
            ) : (
              <EmptyFallback />
            )}
          </div>
        </div>
      </div>

      {isExplorerOpen && (
        <Explorer
          onClose={() => setIsExplorerOpen(false)}
          onPrev={goToPrevious}
          onNext={goToNext}
          index={currentIndex}
          total={total}
          current={currentItem}
        />
      )}
    </div>
  );
}
