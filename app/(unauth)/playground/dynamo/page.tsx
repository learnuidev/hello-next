// import Image from 'next/image'
"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

const useListTables = () => {
  const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: ["list-tables"],
    queryFn: async () => {
      const tables = await fetch("/api/list-tables", {
        method: "POST",
        body: JSON.stringify({
          tableName: "todo",
        }),
        headers: {
          authorization: authUser?.jwt,
        },
      });
      return tables.json();
    },
    enabled: Boolean(authUser?.jwt),
  });
};

const useDynamoDBScan = ({ TableName }: { TableName: string }) => {
  const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: ["scan"],
    queryFn: async () => {
      const tables = await fetch("/api/scan", {
        method: "POST",
        body: JSON.stringify({
          TableName: TableName,
        }),
        headers: {
          authorization: authUser?.jwt,
        },
      });
      return tables.json();
    },
    enabled: Boolean(authUser?.jwt),
  });
};

const formatTableName = (tableName: string) => {
  return tableName?.split("-")[3] === undefined
    ? tableName
    : tableName?.split("-")[3]?.split("Table")[0] === undefined
      ? tableName
      : `${tableName?.split("-")[3]?.split("Table")[0]} Table`;
};

const SelectedTable = ({
  selectedTable,
  removeSelectedTable,
}: {
  selectedTable: string;
  removeSelectedTable: () => void;
}) => {
  const { data: scannedData } = useDynamoDBScan({ TableName: selectedTable });
  return (
    <section className={""}>
      <h1 onClick={removeSelectedTable} className="text-3xl mb-4">
        {formatTableName(selectedTable)}
      </h1>

      <code>
        <pre>{JSON.stringify(scannedData, null, 2)}</pre>
      </code>
    </section>
  );
};

export default function Playground() {
  const [selectedTable, setSelectedTable] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const { data: tables } = useListTables();

  const addSelectedTable = (table: string) => {
    setSelectedTable(table);
  };
  const removeSelectedTable = () => {
    setSelectedTable("");
  };

  return (
    <main className={"mx-16 mt-8"}>
      {selectedTable ? (
        <SelectedTable
          selectedTable={selectedTable}
          removeSelectedTable={removeSelectedTable}
        />
      ) : (
        <>
          <input
            value={filter}
            onChange={(event) => {
              setFilter(event?.target.value);
            }}
            placeholder="search"
            className="w-full h-12 p-4 text-xl"
          />
          {/* <h1 className="text-3xl mb-4">Tables</h1> */}
          <section className="grid grid-cols-1 sm:grid-cols-2 mt-8">
            {/* <code>
            <pre>{JSON.stringify(tables, null, 2)}</pre>
          </code> */}

            {tables?.TableNames?.filter((tableName: string) =>
              tableName.toLowerCase()?.includes(filter?.toLowerCase())
            )?.map((tableName: string) => {
              return (
                <button
                  className="p-4 text-2xl hover:scale-110 transition"
                  onClick={() => {
                    addSelectedTable(tableName);
                  }}
                  key={tableName}
                >
                  {formatTableName(tableName)}
                </button>
              );
            })}
          </section>
        </>
      )}
    </main>
  );
}
