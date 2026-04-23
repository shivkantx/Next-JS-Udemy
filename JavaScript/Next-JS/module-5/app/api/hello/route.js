import { log } from "console";
import { NextResponse } from "next/server";

export const users = [
  { id: 1, name: "Shiv", email: "shiv@gmail.com", age: 23 },
  { id: 2, name: "Rohit", email: "rohit@gmail.com", age: 25 },
  { id: 3, name: "Suresh", email: "suresh@gmail.com", age: 30 },
];
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");
    const age = searchParams.get("age");
    console.log(age, name);

    let filterusers = users;
    if (age) {
      filterusers = filterusers.filter((user) => user.age === Number(age));
    }
    if (name) {
      filterusers = filterusers.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    return NextResponse.json({
      success: true,
      data: filterusers,
      total: filterusers.length,
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
