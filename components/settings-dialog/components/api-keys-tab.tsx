import { Button } from "@/components/ui/button";

import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";

import { AddApiKeyDialog } from "./add-api-key-dialog";
import { ApiKeysTable } from "./api-keys-table";

function formatDate(timestamp: number) {
  const formattedDate = format(timestamp, "MMM d, yyyy");
  return formattedDate;
}

export function ApiKeysTab() {
  const [isAddCredentialOpen, setIsAddCredentialOpen] = useState(false);

  return (
    <>
      <AddApiKeyDialog
        isOpen={isAddCredentialOpen}
        closeAddDialog={() => {
          setIsAddCredentialOpen(false);
        }}
      />

      <Card className="rounded border-black shadow-sm hover:shadow-green-400 transition bg-[#0b0b0f]">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle>API Keys</CardTitle>

            <Button
              className="bg-green-600 hover:bg-green-700 rounded"
              onClick={() => {
                setIsAddCredentialOpen(true);
              }}
            >
              + Add API Key
            </Button>
          </div>
          <CardDescription className="text-gray-500 font-extralight mt-4">
            As the project owner, you can manage all API keys, but avoid sharing
            or exposing them in client-side code; Mandarino may disable any
            publicly leaked key for security.
          </CardDescription>
          <CardDescription className="text-gray-500 font-extralight"></CardDescription>
        </CardHeader>

        <CardContent>
          <ApiKeysTable />
        </CardContent>
      </Card>
    </>
  );
}
