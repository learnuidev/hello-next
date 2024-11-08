"use client";

import { NavBar } from "@/components/navbar";
import { useListUserAssets } from "@/domain/asset/use-list-user-assets";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useDeleteUserAssetMutation } from "./use-delete-user-asset-mutation";

export default function Assets() {
  const { data: userAssets, isError } = useListUserAssets();
  const searchParams = useSearchParams();

  const assetTypeSearchParam = searchParams.get("type") || "";

  const deleteUserAssetMutation = useDeleteUserAssetMutation();

  const assetTypes = [
    ...new Set(userAssets?.map((x) => x.extension)),
  ] as string[];

  const filteredUserAssets = useMemo(() => {
    return userAssets?.filter((item) => {
      if (assetTypeSearchParam) {
        return item?.extension === assetTypeSearchParam;
      }
      return true;
    });
  }, [assetTypeSearchParam, userAssets]);

  const router = useRouter();
  return (
    <main className="">
      <NavBar />

      <section className="px-4 md:px-12">
        <h1 className="text-2xl my-8"> Assets</h1>

        <UploadFileButton className="mb-4" />

        <div className="flex items-center justify-between mb-8">
          <section className="flex justify-start items-center w-full gap-8">
            {assetTypes?.map((assetType) => {
              return (
                <button
                  key={assetType}
                  onClick={() => {
                    router.push(`/assets?type=${assetType}`);
                  }}
                  className={cn(
                    "border-[1px] px-3 rounded-full text-xs py-[2px] border-gray-400 text-gray-400 transition-all dark:hover:text-white dark:hover:border-white hover:text-black hover:border-black",
                    assetType === assetTypeSearchParam
                      ? "dark:text-white dark:border-white text-gray-800 border-gray-800"
                      : "dark:text-gray-600 dark:border-gray-600 text-gray-300 border-gray-300"
                  )}
                >
                  {assetType}
                </button>
              );
            })}
          </section>

          <p className="text-2xl font-extralight">
            {filteredUserAssets?.length}
          </p>
        </div>

        <div className="space-y-8">
          {isError
            ? "ERR"
            : filteredUserAssets?.map((asset: any) => {
                return (
                  <div key={JSON.stringify(asset)}>
                    <code
                      key={JSON.stringify(asset)}
                      onClick={() => {
                        router.push(`/assets/${asset?.id}`);
                      }}
                    >
                      <pre>{JSON.stringify(asset, null, 2)}</pre>
                    </code>

                    <button
                      onClick={() => {
                        deleteUserAssetMutation
                          .mutateAsync({
                            id: asset?.id,
                          })
                          .then(() => {
                            alert("Delete succcess");
                          });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
        </div>
      </section>
    </main>
  );
}
