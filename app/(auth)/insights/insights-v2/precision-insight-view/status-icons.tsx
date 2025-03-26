"use client";

import {
  GreenLightbulbDuoTone,
  Icons,
  RedFireDuoTone,
} from "@/components/ui/icons.v2";

const StatusIcons = {
  needs_review: {
    title: "Needs Review",
    Icon: Icons.glassesRound,
  },
  learned: {
    title: "Learned",
    Icon: GreenLightbulbDuoTone,
  },
  forgotten: {
    title: "Mastered",
    Icon: RedFireDuoTone,
  },
  not_started: {
    title: "Not Started",
    Icon: Icons.questionMark,
  },
} as any;

export const getStatusIcon = (status = "") => {
  const StatusIcon = StatusIcons?.[status] || StatusIcons["not_started"];

  return StatusIcon;
};
