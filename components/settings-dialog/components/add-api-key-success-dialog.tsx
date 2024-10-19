import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/input";
import { Label } from "@radix-ui/react-label";

export function AddApiKeySuccessDialog({
  isOpen,
  apiKey,
  apiSecret,
  closeAddDialog,
}: {
  isOpen: boolean;
  apiKey?: string;
  apiSecret: string;
  closeAddDialog: () => void;
}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        onClick={() => {
          closeAddDialog();
        }}
        className="sm:max-w-2xl border-gray-900 bg-black mt-[-100px]"
      >
        <div>
          <Card className="rounded border-black shadow-sm transition bg-[#0b0b0f] p-8">
            <CardHeader>
              <CardTitle>Save your key</CardTitle>
              <CardDescription className="text-gray-500 font-extralight">
                <p>
                  {`Please save this secret key somewhere safe and accessible. For security reasons, you won't be able to view it again through your OpenAI account. If you lose this secret key, you'll need to generate a new one.`}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label className="text-gray-400"> API Key </Label>
                <Input
                  value={apiKey}
                  className="border-gray-800 placeholder:text-gray-400"
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label className="text-gray-400"> Secret Key</Label>
                <Input
                  value={apiSecret}
                  className="border-gray-800 placeholder:text-gray-400"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <div className="space-x-4 px-4">
            <Button
              onClick={() => {
                closeAddDialog();
              }}
            >
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
