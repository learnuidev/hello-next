import { Input } from "@/components/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginAndSecurityTab() {
  return (
    <Card className="rounded border-black shadow-sm  transition bg-[#0b0b0f]">
      <CardHeader>
        <CardTitle>Password Manager</CardTitle>
        <CardDescription className="text-gray-500 font-extralight">
          Manage Your password here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Change Password"
          className="border-gray-800 placeholder:text-gray-400"
        />
      </CardContent>
    </Card>
  );
}
