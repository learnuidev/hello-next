"use client";
import React from "react";

import { NavBar } from "@/components/navbar";
import { PinyinTable } from "./pinyin-table";

function ChartPage(props: any) {
  return (
    <div>
      <NavBar />
      <div className="sm:mb-0 mb-16">
        <PinyinTable />
      </div>
    </div>
  );
}

export default ChartPage;
