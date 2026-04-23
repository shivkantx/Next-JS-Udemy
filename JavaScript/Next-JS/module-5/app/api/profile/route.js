import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request) {
  const headerList = await headers();
  const authHeader = headerList.get("Authorization");

  //   const requestHedaer = new Headers(request.headers);

  //   const authHeader = requestHedaer.get("Authorization");

  console.log("Auth Header", authHeader);

  //   return new Response("<h1>profile api data</h1>", {
  //     headers: {
  //       "Content-type": "text/html",
  //       "X-Custom-Hedaer": "Next.js Tutorial",
  //     },
  //   });

  const response = NextResponse.json({ message: "hello frrom header" });
  response.headers.set("X-Powered-By-shiv", "Next.js 15");
  response.headers.set("Cache-Control", "no-store");
  return response;
}
