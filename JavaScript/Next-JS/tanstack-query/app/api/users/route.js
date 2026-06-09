import { NextResponse } from "next/server";
import { resolve } from "path";

const users = [
  { id: 1, name: "Shiv Kant", email: "shiv.kant@example.com" },
  { id: 2, name: "Rahul", email: "rahul@example.com" },
  { id: 3, name: "Saurabh", email: "saurabh@example.com" },
  { id: 4, name: "Priya", email: "priya@example.com" },
  { id: 5, name: "Anjali", email: "anjali@example.com" },
  { id: 6, name: "Vikram", email: "vikram@example.com" },
  { id: 7, name: "Neha", email: "neha@example.com" },
  { id: 8, name: "Arjun", email: "arjun@example.com" },
  { id: 9, name: "Pooja", email: "pooja@example.com" },
  { id: 10, name: "Rohan", email: "rohan@example.com" },
];

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
