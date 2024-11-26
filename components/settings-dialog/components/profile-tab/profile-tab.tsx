import { Input } from "@/components/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProfileTab() {
  return (
    <Card className="rounded border-black shadow-sm  transition bg-[#0b0b0f]">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription className="text-gray-500 font-extralight">
          Manage Your profile here
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Username"
          className="border-gray-800 placeholder:text-gray-400"
        />
        <Input
          placeholder="Email"
          className="border-gray-800 placeholder:text-gray-400"
        />
      </CardContent>
    </Card>
  );
}
