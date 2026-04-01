"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons.v2";
import { useAddSeriesMutation } from "@/domain/content-v2/use-add-series-mutation";
import { toast } from "sonner";
import { SeriesForm } from "../components/series-form";

export default function CreateSeriesPage() {
  const router = useRouter();
  const addSeriesMutation = useAddSeriesMutation();

  const handleSubmit = async (data: {
    title: string;
    description?: string;
    topicType: string;
    sourceId: string;
    backgroundImageAssetId: string;
  }) => {
    try {
      await addSeriesMutation.mutateAsync({
        title: data.title,
        description: data.description,
        topicType: data.topicType as any,
        sourceId: data.sourceId,
        backgroundImageAssetId: data.backgroundImageAssetId,
      });
      toast.success("系列创建成功");
      router.push("/studio");
    } catch (error: any) {
      toast.error(error?.message || "创建系列失败");
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-2 sm:mx-12 mb-32">
        <div className="flex items-center gap-4 mb-8 py-8">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-rose-500 transition-colors dark:text-gray-400 dark:hover:text-rose-500"
          >
            <Icons.back className="h-6 w-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">创建新系列</h1>
            <p className="text-gray-600 mt-1 dark:text-gray-400">
              按步骤填写信息以创建新系列
            </p>
          </div>
        </div>

        <SeriesForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}
