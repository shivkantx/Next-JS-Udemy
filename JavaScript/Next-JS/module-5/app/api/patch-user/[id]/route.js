import { NextResponse } from "next/server";
import { users } from "../../hello/route";

export async function PATCH(request, { params }) {
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

    const body = await request.json();

    // ✅ Allowed fields only
    const allowedFields = ["name", "email", "age"];

    const updatedData = {};

    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updatedData[key] = body[key];
      }
    }

    // ❌ Prevent empty update
    if (Object.keys(updatedData).length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid fields provided" },
        { status: 400 },
      );
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updatedData,
    };

    return NextResponse.json(
      {
        success: true,
        data: users[userIndex],
        message: "User partially updated!",
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
