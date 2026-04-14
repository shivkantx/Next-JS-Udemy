import { NextResponse } from "next/server";
import { users } from "../../hello/route.js";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const userId = Number(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 },
      );
    }

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: "User not found!" },
        { status: 404 },
      );
    }

    const { name, email, age } = await request.json();

    if (!name || !email || !age) {
      return NextResponse.json(
        { success: false, error: "All fields required" },
        { status: 400 },
      );
    }

    users[userIndex] = { id: userId, name, email, age };

    return NextResponse.json(
      {
        success: true,
        data: users[userIndex],
        message: "User updated successfully!",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 },
    );
  }
}
