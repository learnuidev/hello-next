// import Image from 'next/image'
"use client";

// 01
// import { StepComponent } from "./tutorial/01_step/01_begin";
import { StepComponent } from "./tutorial/01_step/02_end";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Features } from "./features";

export default function Playground() {
  const [feature, setFeature] = React.useState("step");
  const handleChange = (feat: string) => {
    setFeature(feat);
  };

  const Component =
    Features?.find((feat) => feat.id === feature)?.component || StepComponent;
  return (
    <main>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a feature" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Features?.map((feature) => {
              return (
                <SelectItem key={feature.id} value={feature.id}>
                  {feature.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* <FeatureDropDown /> */}
      {Component ? <Component /> : null}
    </main>
  );
}
