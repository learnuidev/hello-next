import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";

import { AddUserCredentialDialog } from "./components/add-user-credential-dialog";
import { ApiKeysTable } from "./components/api-keys-table";

export function ApiKeysTab({ closeSettings }: { closeSettings: () => void }) {
  const [isAddCredentialOpen, setIsAddCredentialOpen] = useState(false);

  return (
    <>
      <AddUserCredentialDialog
        isOpen={isAddCredentialOpen}
        closeSettings={closeSettings}
        closeAddDialog={() => {
          setIsAddCredentialOpen(false);
        }}
      />

      <Card className="rounded border-black shadow-sm  transition bg-[#0b0b0f]">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle>API Keys</CardTitle>

            <Button
              className="rounded-full hover:border-rose-400"
              variant="outline"
              onClick={() => {
                setIsAddCredentialOpen(true);
              }}
            >
              + Add new secret key
            </Button>
          </div>
          <CardDescription className="text-gray-500 font-extralight">
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
