"use client";

import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons.v2";

export function NoPermissionView() {
  return (
    <Card className="text-center mt-32 py-32 mx-auto max-w-5xl">
      <Icons.infoCircle />
      <p className="text-xl">You dont have the permission to view this page </p>
    </Card>
  );
}
