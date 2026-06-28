import { NextResponse } from "next/server";
import { resolve } from "path";
import { users } from "./data";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function GET() {
  await delay(2000);
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const newUser = {
    id: Date.now(),
    name: body.name,
    email: body.email,
  };
  users.push(newUser);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Response.json(newUser);
}
