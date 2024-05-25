// import Image from 'next/image'
"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Icons } from "@/components/ui/icons.v2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    queryKey: ["scan", TableName],
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

const TableData = ({ selectedTable }: { selectedTable: string }) => {
  const { data: scannedData } = useDynamoDBScan({ TableName: selectedTable });
  return (
    <code>
      <pre>{JSON.stringify(scannedData, null, 2)}</pre>
    </code>
  );
};

const useDescribeTable = ({ TableName }: { TableName: string }) => {
  const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: ["describe-table", TableName],
    queryFn: async () => {
      const tables = await fetch("/api/describe-table", {
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

const TableInfo = ({ selectedTable }: { selectedTable: string }) => {
  const { data: tableInfo } = useDescribeTable({ TableName: selectedTable });
  return (
    <code>
      <pre>{JSON.stringify(tableInfo, null, 2)}</pre>
    </code>
  );
};

const SelectedTable = ({ selectedTable }: { selectedTable: string }) => {
  const { data: scannedData } = useDynamoDBScan({ TableName: selectedTable });
  return (
    <section className={""}>
      <Tabs defaultValue="all" className="p-0">
        <div className="mt-8 flex justify-between items-center">
          <TabsList className="space-x-8">
            <TabsTrigger
              value="info"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              <Icons.info className="text-2xl" />
            </TabsTrigger>
            <TabsTrigger
              value="table"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              <Icons.table className="text-2xl" />
            </TabsTrigger>
            <TabsTrigger
              value="click"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              <Icons.computerMouse className="text-2xl" />
            </TabsTrigger>
            <TabsTrigger
              // value="learned"
              value="discovered"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              <Icons.lightBulb className="text-2xl" />
            </TabsTrigger>
          </TabsList>

          <div className="space-x-4"></div>
        </div>

        <TabsContent value="info" className="my-8">
          <TableInfo selectedTable={selectedTable} />
        </TabsContent>
        <TabsContent value="table" className="my-8">
          <TableData selectedTable={selectedTable} />
        </TabsContent>
        <TabsContent value="click" className="my-8">
          TODO
        </TabsContent>
        <TabsContent value="discovered" className="my-8">
          TODO
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default function Playground() {
  const [choice, setChoice] = React.useState("");
  const [selectedTable, setSelectedTable] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const { data: tables } = useListTables();

  const addSelectedTable = (table: string) => {
    setSelectedTable(table);
  };
  const removeSelectedTable = () => {
    setSelectedTable("");
  };

  const choices = [
    {
      title: "List Tables",
      id: "list-tables",
    },
    {
      title: "ETL",
      id: "etl",
    },
    {
      title: "Join",
      id: "join",
    },
  ];

  const DynamoChoices = () => {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 mt-8">
        {choices.map((choice) => {
          return (
            <button
              onClick={() => {
                setChoice(choice.id);
              }}
              className="p-4 text-2xl hover:scale-110 transition"
              key={choice.title}
            >
              {choice.title}
            </button>
          );
        })}
      </section>
    );
  };

  if (!choice) {
    return (
      <main className={"mx-16 mt-8"}>
        <DynamoChoices />
      </main>
    );
  }

  if (choice === "list-tables") {
    const choiceTitle = choices?.find((c) => c.id === choice)?.title;

    return (
      <main className={"mx-16 mt-8"}>
        <>
          <div className="flex items-center space-x-2  my-8">
            <h1
              onClick={() => {
                setChoice("");
              }}
              className="text-gray-500"
            >
              {choiceTitle}
            </h1>

            {selectedTable && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">{"<"}</span>

                <h1 onClick={removeSelectedTable} className="text-gray-500">
                  {selectedTable}
                </h1>
              </div>
            )}
          </div>

          {selectedTable ? (
            <SelectedTable selectedTable={selectedTable} />
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
        </>
      </main>
    );
  }

  if (choice === "etl") {
    const choiceTitle = choices?.find((c) => c.id === choice)?.title;
    return (
      <main className={"mx-16 mt-8"}>
        <div className="flex items-center space-x-2  my-8">
          <h1
            onClick={() => {
              setChoice("");
            }}
            className="text-gray-500"
          >
            {choiceTitle}
          </h1>

          {selectedTable && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">{"<"}</span>

              <h1 onClick={removeSelectedTable} className="text-gray-500">
                {selectedTable}
              </h1>
            </div>
          )}
        </div>
        {selectedTable ? (
          <SelectedTable selectedTable={selectedTable} />
        ) : (
          <>
            <h1
              onClick={() => {
                setChoice("");
              }}
              className="text-gray-500 my-8"
            >
              ETL
            </h1>
            {/* 
            <input
              value={filter}
              onChange={(event) => {
                setFilter(event?.target.value);
              }}
              placeholder="search"
              className="w-full h-12 p-4 text-xl"
            /> */}

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

  if (choice === "join") {
    return <Join setChoice={setChoice} />;
  }

  return (
    <main className={"mx-16 mt-8"}>
      Oops! We currenty dont support this choice
    </main>
  );
}

const useJoinTables = (params: any) => {
  const { select, join } = params;
  const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: ["join-tables", JSON.stringify(params)],
    queryFn: async () => {
      const tables = await fetch("/api/join", {
        method: "POST",
        body: JSON.stringify({
          select,
          join,
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

function Join({ setChoice }: any) {
  const { data: tables } = useListTables();

  const { data: joinedData } = useJoinTables({
    select: ["*"],
    join: [
      [
        "nomadmethod-api-dev-ComponentsTable20231205-BWKOTISJM1OQ",
        "hanzi",
        ["id"],
      ],
      [
        "nomadmethod-api-dev-MeaningTable-ZFRBA8067NUE",
        "sentenceId",
        ["summary"],
      ],
    ],
  });

  return (
    <div>
      <code>
        <pre>{JSON.stringify(joinedData, null, 2)}</pre>
      </code>
    </div>
  );
}
