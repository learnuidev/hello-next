"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StepsEnum } from "./types";
import { StepTitle } from "./components/step-title";
import { StepDescription } from "./components/step-description";
import { StepTopicType } from "./components/step-topic-type";
import { StepSourceSelection } from "./components/step-source-selection";
import { StepPhotoUpload } from "./components/step-photo-upload";
import { StepSummary } from "./components/step-summary";
import { seriesSchema } from "./validation";
import { Icons } from "@/components/ui/icons.v2";
import { useAddSeriesMutation } from "@/domain/content-v2/use-add-series-mutation";

const STEPS = [
  {
    id: StepsEnum.TITLE,
    title: "标题",
    description: "输入系列标题",
  },
  {
    id: StepsEnum.DESCRIPTION,
    title: "描述",
    description: "提供背景或概述",
  },
  {
    id: StepsEnum.TOPIC_TYPE,
    title: "主题类型",
    description: "选择主题分类",
  },
  {
    id: StepsEnum.SOURCE,
    title: "来源",
    description: "选择或创建来源",
  },
  { id: StepsEnum.PHOTO, title: "照片", description: "上传封面图片" },
  {
    id: StepsEnum.SUMMARY,
    title: "审阅",
    description: "确认您的详情",
  },
];

export default function CreateSeriesPage() {
  const router = useRouter();
  const addSeriesMutation = useAddSeriesMutation();
  const [currentStep, setCurrentStep] = useState(StepsEnum.TITLE);
  const [seriesData, setSeriesData] = useState({
    title: "",
    description: "",
    topicType: "",
    sourceId: "",
    sourceName: "",
    photoAssetId: "",
    photoUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStepIndex = STEPS.findIndex((step) => step.id === currentStep);

  const getStepValidationStatus = (stepId: StepsEnum) => {
    const stepValidations: Record<StepsEnum, () => boolean> = {
      [StepsEnum.TITLE]: () =>
        !!seriesData.title?.trim() && seriesData.title.length >= 3,
      [StepsEnum.DESCRIPTION]: () =>
        !!seriesData.description?.trim() && seriesData.description.length >= 10,
      [StepsEnum.TOPIC_TYPE]: () => !!seriesData.topicType?.trim(),
      [StepsEnum.SOURCE]: () => !!seriesData.sourceId?.trim(),
      [StepsEnum.PHOTO]: () => true,
      [StepsEnum.SUMMARY]: () => true,
    };
    return stepValidations[stepId]?.() ?? false;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepId: StepsEnum) => {
    setCurrentStep(stepId);
  };

  const handleSubmit = async () => {
    try {
      seriesSchema.parse(seriesData);
      setErrors({});
      setIsSubmitting(true);

      addSeriesMutation.mutate(
        {
          title: seriesData.title,
          topicType: seriesData.topicType as any,
          sourceId: seriesData.sourceId,
          backgroundImageAssetId: seriesData.photoAssetId || "",
        },
        {
          onSuccess: () => {
            toast.success("Series created successfully");
            router.push("/studio");
          },
          onError: (error: any) => {
            toast.error(error?.message || "Failed to create series");
            setIsSubmitting(false);
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        const zodError = error as any;
        const fieldErrors: Record<string, string> = {};
        zodError.errors?.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        toast.error("Please fill in all required fields");
      }
      setIsSubmitting(false);
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
              第 {currentStepIndex + 1} 步，共 {STEPS.length} 步
            </p>
          </div>
        </div>

        <div className="flex gap-12 items-start">
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-8">
            <nav className="flex flex-col gap-6">
              {STEPS.map((step, index) => {
                const isValid = getStepValidationStatus(step.id);
                const isActive = step.id === currentStep;
                const isComplete = isValid && step.id !== currentStep;

                return (
                  <motion.button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "text-left transition-colors relative pb-2",
                      isActive
                        ? "text-rose-500"
                        : "text-gray-600 hover:text-rose-500 dark:text-gray-400 dark:hover:text-rose-500"
                    )}
                  >
                    <div className="flex gap-2">
                      {isComplete ? (
                        <Icons.checkCircleSolid className="h-4 w-4 inline-block ml-2 text-green-500" />
                      ) : (
                        <Icons.exlamationCircle className="h-4 w-4 inline-block ml-2 text-yellow-500" />
                      )}
                      <span className="font-medium text-base">
                        {step.title}
                      </span>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeStep"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </aside>

          <div className="flex-1 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-2">
                    {STEPS[currentStepIndex].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {STEPS[currentStepIndex].description}
                  </p>
                </div>

                <div className="bg-card rounded-lg border p-8 space-y-8 dark:bg-[rgb(11,12,13)] dark:border-gray-800">
                  {currentStep === StepsEnum.TITLE && (
                    <StepTitle
                      value={seriesData.title}
                      onChange={(value) =>
                        setSeriesData({ ...seriesData, title: value })
                      }
                      error={errors.title}
                    />
                  )}

                  {currentStep === StepsEnum.DESCRIPTION && (
                    <StepDescription
                      value={seriesData.description}
                      onChange={(value) =>
                        setSeriesData({ ...seriesData, description: value })
                      }
                      error={errors.description}
                    />
                  )}

                  {currentStep === StepsEnum.TOPIC_TYPE && (
                    <StepTopicType
                      value={seriesData.topicType}
                      onChange={(value) =>
                        setSeriesData({ ...seriesData, topicType: value })
                      }
                      error={errors.topicType}
                    />
                  )}

                  {currentStep === StepsEnum.SOURCE && (
                    <StepSourceSelection
                      sourceId={seriesData.sourceId}
                      sourceName={seriesData.sourceName}
                      onSourceChange={(id, name) =>
                        setSeriesData({
                          ...seriesData,
                          sourceId: id,
                          sourceName: name,
                        })
                      }
                      error={errors.sourceId}
                    />
                  )}

                  {currentStep === StepsEnum.PHOTO && (
                    <StepPhotoUpload
                      photoUrl={seriesData.photoUrl}
                      photoAssetId={seriesData.photoAssetId}
                      onPhotoChange={(url, assetId) =>
                        setSeriesData({
                          ...seriesData,
                          photoUrl: url,
                          photoAssetId: assetId,
                        })
                      }
                      error={errors.photoAssetId}
                    />
                  )}

                  {currentStep === StepsEnum.SUMMARY && (
                    <StepSummary seriesData={seriesData} />
                  )}

                  <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className="text-gray-600 hover:text-rose-500 hover:bg-rose-50 h-11 px-6 text-base dark:text-gray-400 dark:hover:text-rose-500 dark:hover:bg-rose-950/20"
                    >
                      返回
                    </Button>

                    {currentStep === STEPS.length - 1 ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-rose-500 hover:bg-rose-600 h-11 px-8 text-base"
                      >
                        {isSubmitting ? "创建中..." : "创建系列"}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        className="bg-rose-500 hover:bg-rose-600 h-11 px-6 text-base"
                      >
                        下一步
                        <Icons.front className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
