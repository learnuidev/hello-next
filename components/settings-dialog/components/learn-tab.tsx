import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLearningModeStore } from "../learning-mode.store";
import { Checkbox } from "@/components/ui/checkbox";

export function LearnTab() {
  const setMode = useLearningModeStore((state: any) => state.setMode);
  const mode = useLearningModeStore((state: any) => state.mode);

  return (
    <Card className="rounded border-black shadow-sm hover:shadow-green-400 transition bg-[#0b0b0f]">
      <CardHeader>
        <CardTitle>Learn</CardTitle>
        <CardDescription className="text-gray-500 font-extralight">
          Select your preferred learning method
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
        <div>
          <div className="flex z-50 items-center space-x-2">
            <Checkbox
              checked={mode === "nmm"}
              onCheckedChange={(event) => {
                if (event) {
                  setMode("nmm");
                } else {
                  setMode("");
                }
              }}
            />
            <Label htmlFor="airplane-mode">Mandarin Blueprint</Label>
          </div>

          <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
            Based on Mandarin Blueprint Curriculum
          </p>
        </div>
        <div>
          <div className="flex z-50 items-center space-x-2">
            <Checkbox
              checked={mode === "hsk"}
              onCheckedChange={(event) => {
                if (event) {
                  setMode("hsk");
                } else {
                  setMode("");
                }
              }}
            />
            <Label htmlFor="airplane-mode">HSK</Label>
          </div>

          <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
            Great for HSK Exam Preparation (Recommended)
          </p>
        </div>
        <div>
          <div className="flex z-50 items-center space-x-2">
            <Checkbox
              checked={mode === "hsk3"}
              onCheckedChange={(event) => {
                if (event) {
                  setMode("hsk3");
                } else {
                  setMode("");
                }
              }}
            />
            <Label htmlFor="airplane-mode">HSK 3.0</Label>
          </div>

          <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
            For HSK 3.0 Exam Preparation
          </p>
        </div>
        <div>
          <div className="flex z-50 items-center space-x-2">
            <Checkbox
              checked={mode === "yct"}
              onCheckedChange={(event) => {
                if (event) {
                  setMode("yct");
                } else {
                  setMode("");
                }
              }}
            />
            <Label htmlFor="airplane-mode">YCT</Label>
          </div>

          <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
            Great for Youth Chinese Test Preparation
          </p>
        </div>
        <div>
          <div className="flex z-50 items-center space-x-2">
            <Checkbox
              checked={mode === "xiaoma"}
              onCheckedChange={(event) => {
                if (event) {
                  setMode("xiaoma");
                } else {
                  setMode("");
                }
              }}
            />
            <Label htmlFor="airplane-mode">Xiaoma</Label>
          </div>

          <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
            Based on Street Mandarin by Xiaoma (Focuses on Speaking Chinese)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
