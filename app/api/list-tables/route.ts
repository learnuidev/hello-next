import { verifyJwt } from "@/libs/cognito/jwt";
import { listTables } from "@/libs/dynamodb/list-tables";

import { headers } from "next/headers";

export const maxDuration = 60;
// export const runtime = "edge";

export async function POST(req: Request) {
  const { tableName } = await req.json();

  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: true });

  if (isVerified) {
    const resp = await listTables();
    return Response.json(resp);
  } else {
    return Response.json({
      message: "Not authorized",
    });
    // throw new Error("Unauthorized");
  }
}
