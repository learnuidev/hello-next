"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageContainer } from "@/components/page-container";
import { FloatingNavbar } from "@/components/floating-navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import {
  useListCollectionsQuery,
  type ICollection,
} from "@/domain/collections/use-list-collections-query";
import { useAddCollectionMutation } from "@/domain/collections/use-add-collection-mutation";
import { useGetCollectionQuery } from "@/domain/collections/use-get-collection-query";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17,
};

function CollectionCard({
  collection,
  index,
  onClick,
}: {
  collection: ICollection;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <motion.div
        className="dark:hover:bg-[rgb(14,15,16)] dark:bg-[rgb(11,12,13)] hover:bg-gray-100 bg-gray-50 flex items-center justify-between shadow rounded-lg overflow-hidden cursor-pointer px-6 py-5"
        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
        whileTap={{ scale: 0.98 }}
        transition={springTransition}
        onClick={onClick}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500/10 flex-shrink-0">
            <Icons.archive className="text-rose-400 text-lg" />
          </div>
          <div className="min-w-0">
            <motion.h3
              className="font-semibold text-lg truncate"
              whileHover={{ color: "rgb(244, 63, 94)" }}
              transition={springTransition}
            >
              {collection.title}
            </motion.h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {collection.totalItems} item
              {collection.totalItems !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <Icons.front className="text-gray-600 text-lg flex-shrink-0 ml-4" />
      </motion.div>
    </motion.div>
  );
}

function CollectionDetail({
  collectionId,
  onBack,
}: {
  collectionId: string;
  onBack: () => void;
}) {
  const { data: _collectionData, isLoading } = useGetCollectionQuery({
    collectionId,
  });

  const collection = _collectionData as any;

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  if (!collection) {
    return <Nothing message="Collection not found" icon={Icons.archive} />;
  }

  const items: any[] = collection.items || [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onBack}
        className="text-sm text-gray-500 hover:text-rose-400 mb-8 flex items-center gap-2 transition"
      >
        <Icons.back className="text-lg" />
        <span className="font-light">Collections</span>
      </button>

      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 flex-shrink-0">
          <Icons.archive className="text-rose-400 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{collection.title}</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {collection.totalItems} item{collection.totalItems !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="mt-10">
        {items.length === 0 ? (
          <Nothing message="No items yet" icon={Icons.seedling} />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6">
            {items.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/nmm/${item.characterId}${item.lang ? `?lang=${item.lang}` : ""}`}
                >
                  <motion.div
                    className="dark:hover:bg-[rgb(14,15,16)] dark:bg-[rgb(11,12,13)] hover:bg-gray-100 bg-gray-50 shadow rounded-lg overflow-hidden cursor-pointer px-5 py-4"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={springTransition}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 flex-shrink-0">
                        <span className="text-lg">
                          {item.characterId?.charAt(0) || "?"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <motion.h4
                          className="font-medium text-base truncate"
                          whileHover={{ color: "rgb(244, 63, 94)" }}
                          transition={springTransition}
                        >
                          {item.characterId ||
                            item.input ||
                            item.title ||
                            item.id}
                        </motion.h4>
                        {item.lang && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.lang}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function CollectionsPage() {
  const [newTitle, setNewTitle] = useState("");
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  const { data: collectionsData, isLoading } = useListCollectionsQuery();
  const addCollectionMutation = useAddCollectionMutation();

  const collections: ICollection[] = (collectionsData as any)?.items || [];

  return (
    <main>
      <PageContainer>
        <div className="mt-8 sm:mt-16">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-400 mb-16 sm:mb-24">
            Collections
          </h1>

          <AnimatePresence mode="wait">
            {selectedCollectionId ? (
              <CollectionDetail
                key="detail"
                collectionId={selectedCollectionId}
                onBack={() => setSelectedCollectionId(null)}
              />
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-10 max-w-md">
                  <Input
                    placeholder="New collection..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newTitle.trim()) {
                        addCollectionMutation.mutate(
                          { title: newTitle.trim() },
                          {
                            onSuccess: () => {
                              setNewTitle("");
                              toast.success("Collection created");
                            },
                            onError: (err: any) => {
                              toast.error(
                                err?.message || "Failed to create collection",
                              );
                            },
                          },
                        );
                      }
                    }}
                    className="flex-1 rounded-full"
                  />
                  <Button
                    size="icon"
                    className="rounded-full h-10 w-10 bg-rose-500 hover:bg-rose-600 text-white"
                    disabled={
                      !newTitle.trim() || addCollectionMutation.isPending
                    }
                    onClick={() => {
                      addCollectionMutation.mutate(
                        { title: newTitle.trim() },
                        {
                          onSuccess: () => {
                            setNewTitle("");
                            toast.success("Collection created");
                          },
                          onError: (err: any) => {
                            toast.error(
                              err?.message || "Failed to create collection",
                            );
                          },
                        },
                      );
                    }}
                  >
                    {addCollectionMutation.isPending ? (
                      <Icons.spinner className="animate-spin h-4 w-4" />
                    ) : (
                      <Icons.plusIcon className="text-lg" />
                    )}
                  </Button>
                </div>

                {isLoading ? (
                  <LottieLoadingAnimation />
                ) : collections.length === 0 ? (
                  <Nothing message="No collections yet" icon={Icons.archive}>
                    <p className="text-sm text-gray-600 mt-4 font-light">
                      Create your first collection above
                    </p>
                  </Nothing>
                ) : (
                  <div className="space-y-4">
                    {collections.map((collection, index) => (
                      <CollectionCard
                        key={collection.id}
                        collection={collection}
                        index={index}
                        onClick={() => setSelectedCollectionId(collection.id)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageContainer>
      <FloatingNavbar />
    </main>
  );
}
