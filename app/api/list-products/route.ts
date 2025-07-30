import { verifyJwt } from "@/libs/cognito/jwt";
import { headers } from "next/headers";
import { polarApi } from "@/libs/polar/polar-api";

export const maxDuration = 60;

export async function GET(req: Request) {
  const headersApi = await headers();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: false });

  if (isVerified) {
    const products = await polarApi.products.list({});

    return Response.json(products);
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
