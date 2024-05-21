// import Image from 'next/image'
"use client";

import { MQL } from "./MQL/MQL";
// 01
// import { StepComponent } from "./tutorial/01_step/01_begin";
import { StepComponent } from "./tutorial/01_step/02_end";

// 02
// import { Email } from "./tutorial/02_email/01_begin";
import { Email } from "./tutorial/02_email/02_end";

// 03
import { ScrollableHeader } from "./tutorial/03_scrollable_header/01_end";

export const Features = [
  {
    id: "step",
    label: "Fancy Step Component",
    component: StepComponent,
    createdAt: Date.now(),
  },
  {
    id: "email",
    label: "Email",
    component: Email,
    createdAt: Date.now(),
  },
  {
    id: "scrollable-header",
    label: "Scrollable Header",
    component: ScrollableHeader,
    createdAt: Date.now(),
  },
  {
    id: "mql",
    label: "Mandarin Query Language",
    component: MQL,
    createdAt: Date.now(),
  },
];
