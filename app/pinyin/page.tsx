"use client";
import React from "react";

import { NavBar } from "@/components/navbar";
import { PinyinTable } from "./pinyin-table";

function ChartPage(props: any) {
  return (
    <div>
      <NavBar />
      <PinyinTable />
    </div>
  );
}

export default ChartPage;
