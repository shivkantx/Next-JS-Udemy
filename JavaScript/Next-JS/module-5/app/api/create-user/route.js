import { NextResponse } from "next/server";
import { users } from "../hello/route";
import { error } from "console";

export async function POST(request) {
  try {
    const { name, email, age } = await request.json();
    if (!name || !email || !age) {
      return NextResponse(
        {
          success: false,
          error: "Name , email and age is required",
        },
        { status: 400 },
      );
    }

    const emailExists = users.find((user) => users.email === email);

    if (!emailExists) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already exists",
        },
        { status: 400 },
      );
    }

    const newUser = {
      id: users.length + 1,
      name: name,
      email: email,
      age: age,
    };

    users.push(newUser);
    return NextResponse.json(
      {
        success: true,
        message: "User Created successfully!",
        data: users,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "failed to create user",
      },
      { status: 500 },
    );
  }
}
