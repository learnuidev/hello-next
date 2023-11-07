import { useCallback, useEffect, useRef, useState } from "react";

import { useViewModeStore } from "./use-view-mode-store";
import { useCharacterStore, useCurrentStepStore } from "./nomad-method-store";

const firstLesson = {
  title: "Characters #1-3: 一 yī, 二 èr, 三 sān",
  lessons: [
    {
      id: "0b",
      type: "info",
      componentId: "一",
      title: `一 is the Chinese character for the number "one."`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "0c",
      type: "info",
      componentId: "一",
      title: `It is used to represent the concept of singularity or the quantity "one" in numerical terms.`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "0d",
      type: "info",
      componentId: "一",
      title: `Additionally, it can be used in various contexts to indicate unity, simplicity, or as a general symbol of individuality or uniqueness.`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "0e",
      type: "info",
      componentId: "一",
      title: `In Chinese culture, it also holds symbolic significance, representing beginnings, originality, and the first step in a series of progression.`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "1",
      key: "component",
      type: "component:create",
      componentId: "一",
      title: `Enter a Component for 一`,
      suggestions: ["flute", "wand"],
    },
    {
      id: "2",
      key: "nomad",
      type: "nomad:create",
      componentId: "一",
      title: `Enter a nomad for for -y`,
      suggestions: ["Yuvraj Singh", "Yogi Bear"],
    },
    {
      id: "3",
      key: "destination",
      type: "destination:create",
      componentId: "一",
      title: `Enter a destiantion for for -i`,
      suggestions: ["Delhi, India", "Goa, India"],
    },
    {
      id: "4",
      key: "location",
      type: "location:create",
      componentId: "一",
      title: `Enter a location for -i4`,
      suggestions: ["Airport"],
    },
    {
      id: "5",
      key: "story",
      type: "story:create",
      componentId: "一",
      title: `Create a story`,
      suggestions: [""],
    },
  ],
};