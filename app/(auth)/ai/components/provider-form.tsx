"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Provider = "openai" | "moonshot" | "deepseek" | "qwen" | "mistral";

type ProviderData = {
  variant: Provider;
  apiKey: string;
};

export function ProviderForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [formData, setFormData] = useState<ProviderData>({
    variant: "openai",
    apiKey: "",
  });

  const handleProviderChange = (value: Provider) => {
    setFormData({ ...formData, variant: value });
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, apiKey: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Saved provider data:", formData);
      setLoading(false);
      setComplete(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      variant: "openai",
      apiKey: "",
    });
    setStep(1);
    setComplete(false);
  };

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full sm:max-w-md overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle>Add AI Provider</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Configure your AI provider credentials
          </CardDescription>
        </CardHeader>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center text-sm text-muted-foreground">
                    Step 1 of 2
                  </div>
                  <h3 className="text-lg font-medium">Select a provider</h3>
                  <RadioGroup
                    value={formData.variant}
                    onValueChange={(value) =>
                      handleProviderChange(value as Provider)
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-muted">
                      <RadioGroupItem value="openai" id="openai" />
                      <Label htmlFor="openai" className="flex-1 cursor-pointer">
                        OpenAI
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-muted">
                      <RadioGroupItem value="moonshot" id="moonshot" />
                      <Label
                        htmlFor="moonshot"
                        className="flex-1 cursor-pointer"
                      >
                        Moonshot
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-muted">
                      <RadioGroupItem value="deepseek" id="deepseek" />
                      <Label
                        htmlFor="deepseek"
                        className="flex-1 cursor-pointer"
                      >
                        DeepSeek
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-muted">
                      <RadioGroupItem value="qwen" id="qwen" />
                      <Label htmlFor="qwen" className="flex-1 cursor-pointer">
                        Qwen
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-muted">
                      <RadioGroupItem value="mistral" id="mistral" />
                      <Label
                        htmlFor="mistral"
                        className="flex-1 cursor-pointer"
                      >
                        Mistral
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t p-4">
                <Button onClick={nextStep}>
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center text-sm text-muted-foreground">
                    Step 2 of 2
                  </div>
                  <h3 className="text-lg font-medium">Enter your API key</h3>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">
                      API Key for {formData.variant}
                    </Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="sk-..."
                      value={formData.apiKey}
                      onChange={handleApiKeyChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your API key will be securely stored and used for making
                      requests to the {formData.variant} API.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.apiKey || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Provider"
                  )}
                </Button>
              </CardFooter>
            </motion.div>
          )}

          {complete && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium">
                  Provider Added Successfully
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Your {formData.variant} provider has been configured and is
                  ready to use.
                </p>
                <div className="rounded-md bg-muted p-4 text-left">
                  <pre className="text-sm">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t p-4">
                <Button onClick={resetForm}>Add Another Provider</Button>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
