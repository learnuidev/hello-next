"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

const STEPS = [
  {
    id: StepsEnum.TITLE,
    title: "Title",
    description: "Enter the series title",
  },
  {
    id: StepsEnum.DESCRIPTION,
    title: "Description",
    description: "Provide context or overview",
  },
  {
    id: StepsEnum.TOPIC_TYPE,
    title: "Topic Type",
    description: "Select topic category",
  },
  {
    id: StepsEnum.SOURCE,
    title: "Source",
    description: "Choose or create source",
  },
  { id: StepsEnum.PHOTO, title: "Photo", description: "Upload cover image" },
  {
    id: StepsEnum.SUMMARY,
    title: "Review",
    description: "Confirm your details",
  },
];

export default function CreateSeriesPage() {
  const router = useRouter();
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

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return "complete";
    if (stepIndex === currentStepIndex) return "active";
    return "pending";
  };

  const getStepValidationStatus = (stepId: StepsEnum) => {
    const stepValidations: Record<StepsEnum, () => boolean> = {
      [StepsEnum.TITLE]: () => !!seriesData.title?.trim() && seriesData.title.length >= 3,
      [StepsEnum.DESCRIPTION]: () => !!seriesData.description?.trim() && seriesData.description.length >= 10,
      [StepsEnum.TOPIC_TYPE]: () => !!seriesData.topicType?.trim(),
      [StepsEnum.SOURCE]: () => !!seriesData.sourceId?.trim(),
      [StepsEnum.PHOTO]: () => true,
      [StepsEnum.SUMMARY]: () => true,
    };
    return stepValidations[stepId]?.() ?? false;
  };

  const getStepErrorMessage = (stepId: StepsEnum) => {
    const errorMessages: Record<StepsEnum, string> = {
      [StepsEnum.TITLE]: seriesData.title?.trim() ? "Title must be at least 3 characters" : "Title is required",
      [StepsEnum.DESCRIPTION]: seriesData.description?.trim() ? "Description must be at least 10 characters" : "Description is required",
      [StepsEnum.TOPIC_TYPE]: "Topic type is required",
      [StepsEnum.SOURCE]: "Source is required",
      [StepsEnum.PHOTO]: "",
      [StepsEnum.SUMMARY]: "",
    };
    return errorMessages[stepId] || "";
  };

  const validateCurrentStep = () => {
    try {
      seriesSchema.parse(seriesData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const zodError = error as any;
        const fieldErrors: Record<string, string> = {};
        zodError.errors?.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

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
    const targetIndex = STEPS.findIndex((step) => step.id === stepId);
    if (targetIndex < currentStepIndex) {
      setCurrentStep(stepId);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      toast.success("Series created successfully");
      router.push("/studio");
    } catch (error) {
      toast.error("Failed to create series");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="mx-auto py-16 px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="h-11 w-11 hover:bg-muted/80 transition-colors"
              >
                <Icons.back className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight mb-2">
                  Create New Series
                </h1>
                <p className="text-muted-foreground text-lg">
                  Step {currentStepIndex + 1} of {STEPS.length}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-8 items-start">
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-8">
              <nav className="space-y-1">
                {STEPS.map((step, index) => {
                  const status = getStepStatus(index);
                  const isValid = getStepValidationStatus(step.id);
                  const errorMessage = getStepErrorMessage(step.id);
                  const isClickable = status === "complete" || status === "active";

                  return (
                    <Tooltip key={step.id}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => isClickable && handleStepClick(step.id)}
                          disabled={!isClickable}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 text-left group",
                            status === "active"
                              ? "bg-primary text-primary-foreground shadow-md"
                              : isClickable
                              ? "hover:bg-muted/80 cursor-pointer"
                              : "cursor-not-allowed"
                          )}
                        >
                          <div
                            className={cn(
                              "flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-sm",
                              status === "complete"
                                ? "bg-green-500 text-white"
                                : status === "active"
                                ? "bg-white text-primary"
                                : "bg-muted text-muted-foreground"
                            )}
                        >
                          {status === "complete" ? (
                            <Icons.check className="h-4 w-4" />
                          ) : status === "active" ? (
                            index + 1
                          ) : !isValid ? (
                            <Icons.questionMark className="h-4 w-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={cn(
                                "font-medium text-sm truncate",
                                status === "active"
                                  ? "text-primary-foreground"
                                  : "text-foreground"
                              )}
                            >
                              {step.title}
                            </div>
                            <div
                              className={cn(
                                "text-xs truncate",
                                status === "active"
                                  ? "text-primary-foreground/80"
                                  : "text-muted-foreground"
                              )}
                            >
                              {step.description}
                            </div>
                          </div>
                          {status === "active" && (
                            <Icons.front className="h-4 w-4 text-primary-foreground animate-pulse" />
                          )}
                        </button>
                      </TooltipTrigger>
                      {!isClickable && errorMessage && (
                        <TooltipContent side="right" className="bg-destructive text-destructive-foreground">
                          <p className="text-sm">{errorMessage}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </nav>
            </aside>

            <div className="flex-1 max-w-2xl">
              <Card className="border-2 shadow-lg bg-card/95 backdrop-blur">
                <CardHeader className="space-y-2 pb-8">
                  <CardTitle className="text-3xl font-semibold">
                    {STEPS[currentStepIndex].title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {STEPS[currentStepIndex].description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-10 pt-6">
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

                  <div className="flex justify-between pt-8 border-t">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className="h-11 px-6 text-base"
                    >
                      Back
                    </Button>

                    {currentStep === STEPS.length - 1 ? (
                      <Button onClick={handleSubmit} disabled={isSubmitting} className="h-11 px-8 text-base">
                        {isSubmitting ? "Creating..." : "Create Series"}
                      </Button>
                    ) : (
                      <Button onClick={handleNext} className="h-11 px-6 text-base">
                        Next
                        <Icons.front className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
