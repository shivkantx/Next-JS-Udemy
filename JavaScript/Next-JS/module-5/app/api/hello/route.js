import { NextResponse } from "next/server";

export const users = [
  { id: 1, name: "Shiv", email: "shiv@gmail.com", age: 23 },
  { id: 2, name: "Rohit", email: "rohit@gmail.com", age: 25 },
  { id: 3, name: "Suresh", email: "suresh@gmail.com", age: 30 },
];
export async function GET(request) {
  try {
    return NextResponse.json({
      success: true,
      data: users,
      total: users.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get users",
      },
      { status: 500 },
    );
  }
}
