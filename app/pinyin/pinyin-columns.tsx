"use client";
import React, { useMemo } from "react";
import { CloseIcon } from "@/components/ui/icons";

import { usePinyinChartState, usePinyinChartStore } from "./state";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { characterDictionary, defaultData } from "./data";

import { NavBar } from "@/components/navbar";
import { PinyinDetail } from "./pinyin-detail";

const columnHelper = createColumnHelper<any>();

const totalCharacters = defaultData
  ?.map((val: any) => Object.values(val))
  .flat()
  .filter((val: any) => val?.value);

const totalProblemInitials = defaultData
  ?.map((val: any) => Object.values(val))
  .flat()
  .filter((val: any) => val?.value && val?.problemInitial);

// aa: 'a',
// aai: 'ai',
// aao: 'ao',
// aan: 'an',
// aang: 'ang',

const InfoRenderer = (info: any) => {
  const val = info.getValue();
  if (!Array.isArray(val) && typeof val === "string") {
    return val;
  }
  return val.value;
};

export const pinyinColumns = [
  columnHelper.group({
    id: "initial",
    // header: () => <span className='my-2 mx-2.5 text-xs text-center'>actor</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("initial", {
        cell: InfoRenderer,
        header: () => <span className="my-2 mx-2.5 text-xs text-center"></span>,
      }),
    ],
  }),
  columnHelper.group({
    id: "A",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">A</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("aa", {
        cell: (info) => {
          const val = info.getValue();
          if (!Array.isArray(val) && typeof val === "string") {
            return val;
          }
          return val.value;
        },
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">a</span>
        ),
      }),
      columnHelper.accessor("aai", {
        cell: (info) => {
          const val = info.getValue();
          if (!Array.isArray(val) && typeof val === "string") {
            return val;
          }
          return val.value;
        },
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ai</span>
        ),
      }),
      columnHelper.accessor("aao", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ao</span>
        ),
      }),
      columnHelper.accessor("aan", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">an</span>
        ),
      }),
      columnHelper.accessor("aang", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ang</span>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: "E",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">E</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("ee", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">e</span>
        ),
      }),
      columnHelper.accessor("eei", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ei</span>
        ),
      }),
      columnHelper.accessor("een", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">en</span>
        ),
      }),

      columnHelper.accessor("eeng", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">eng</span>
        ),
      }),
      columnHelper.accessor("enull", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">null</span>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: "O",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">O</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("oo", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">o</span>
        ),
      }),
      columnHelper.accessor("oong", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ong</span>
        ),
      }),
      columnHelper.accessor("oou", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ou</span>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: "I",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">I</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("inull", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">null</span>
        ),
      }),
      columnHelper.accessor("ia", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">a</span>
        ),
      }),
      columnHelper.accessor("iao", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ao</span>
        ),
      }),
      columnHelper.accessor("ie", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">e</span>
        ),
      }),
      columnHelper.accessor("iou", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ou</span>
        ),
      }),
      columnHelper.accessor("ian", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">an</span>
        ),
      }),
      columnHelper.accessor("iang", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ang</span>
        ),
      }),
      columnHelper.accessor("ien", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">en</span>
        ),
      }),
      columnHelper.accessor("ieng", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">eng</span>
        ),
      }),
      columnHelper.accessor("iong", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ong</span>
        ),
      }),
    ],
  }),

  // // U
  // unull: 'wu',
  // ua: 'wa',
  // uo: 'wo',
  // uei: 'wei',
  // uai: 'wai',
  // uan: 'wan',
  // uen: 'wen',
  // uang: 'wang',
  // ueng: 'weng',
  columnHelper.group({
    id: "U",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">U</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("unull", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">null</span>
        ),
      }),
      columnHelper.accessor("ua", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">a</span>
        ),
      }),
      columnHelper.accessor("uo", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">o</span>
        ),
      }),
      columnHelper.accessor("uei", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ei</span>
        ),
      }),
      columnHelper.accessor("uai", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ai</span>
        ),
      }),
      columnHelper.accessor("uan", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">an</span>
        ),
      }),
      columnHelper.accessor("uen", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">en</span>
        ),
      }),
      columnHelper.accessor("uang", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ang</span>
        ),
      }),
      columnHelper.accessor("ueng", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">eng</span>
        ),
      }),
    ],
  }),
  // // ü
  // ünull: 'yu',
  // üe: 'yue',
  // üan: 'yuan',
  // üen: 'yun'
  columnHelper.group({
    id: "Ü",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">Ü</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("ünull", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">null</span>
        ),
      }),
      columnHelper.accessor("üe", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">üe</span>
        ),
      }),
      columnHelper.accessor("üan", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">üan</span>
        ),
      }),
      columnHelper.accessor("üen", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ün</span>
        ),
      }),
    ],
  }),
];
