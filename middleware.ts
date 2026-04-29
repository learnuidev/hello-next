import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { i18nConfig } from "./libs/i18n-next/i18n-config";

export async function middleware(request: NextRequest) {
  const current = (await cookies()).get(i18nConfig.cookieName)?.value;
  const response = NextResponse.next();

  if (!current) {
    response.cookies.set(i18nConfig.cookieName, i18nConfig.fallbackLanguage);
  }

  // Store current request url in a custom header, so we can read them later
  response.headers.set("x-url", request.url);

  return response;
}
