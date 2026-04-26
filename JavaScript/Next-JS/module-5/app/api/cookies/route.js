import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  //   const theme = request.cookies.get("theme")?.value;
  //   console.log("Cookies", theme);

  const cookieStore = await cookies();
  //   const resultPerPage = cookieStore.get("resultPerPage")?.value;

  //   console.log("Cookies", resultPerPage);
  cookieStore.delete("score");

  //   return new Response("Setting cookies", {
  //     headers: {
  //       //   "Set-Cookie": "theme=dark",
  //       "Set-Cookie": "resultPerPage=20; Path=/; Max-Age=86400",
  //     },
  //   });

  return NextResponse.json({ message: "Cookie deleted!" });
}
