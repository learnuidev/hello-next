"use client";

import { PageContainer } from "@/components/page-container";
import { FloatingNavbar } from "@/components/floating-navbar";
import { ContentCollectionsSections } from "@/components/content-collections/content-collections-sections";

export default function ContentCollectionsPage() {
  return (
    <main>
      <PageContainer>
        <div className="mt-8 sm:mt-16">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-400 mb-16 sm:mb-24">
            收藏
          </h1>

          <ContentCollectionsSections />
        </div>
      </PageContainer>
      <FloatingNavbar />
    </main>
  );
}
