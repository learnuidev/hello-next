"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PageContainer } from "@/components/page-container";
import { FloatingNavbar } from "@/components/floating-navbar";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { ContentCollectionsList } from "@/components/content-collections/content-collections-list";
import { ContentCollectionDetail } from "@/components/content-collections/content-collection-detail";

function ContentCollectionsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const collectionIdSearchParam = searchParams.get("collectionId");

  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (collectionIdSearchParam) {
      setSelectedCollectionId(collectionIdSearchParam);
    }
  }, [collectionIdSearchParam]);

  const selectCollection = (collectionId: string) => {
    setSelectedCollectionId(collectionId);
    router.push(`/content-collections?collectionId=${collectionId}`);
  };

  const clearSelection = () => {
    setSelectedCollectionId(null);
    router.push("/content-collections");
  };

  return (
    <main>
      <PageContainer>
        <div className="mt-8 sm:mt-16">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-400 mb-16 sm:mb-24">
            收藏
          </h1>

          <AnimatePresence mode="wait">
            {selectedCollectionId ? (
              <ContentCollectionDetail
                key="detail"
                collectionId={selectedCollectionId}
                onBack={clearSelection}
              />
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ContentCollectionsList onSelectCollection={selectCollection} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageContainer>
      <FloatingNavbar />
    </main>
  );
}

export default function ContentCollectionsPage() {
  return (
    <Suspense fallback={<LottieLoadingAnimation />}>
      <ContentCollectionsPageContent />
    </Suspense>
  );
}
