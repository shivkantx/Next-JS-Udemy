import { NextResponse } from "next/server";
import { users } from "../../hello/route";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const userId = Number(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid user id",
        },
        { status: 400 },
      );
    }

    if (users.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No users available",
        },
        { status: 400 },
      );
    }

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found!",
        },
        { status: 404 },
      );
    }

    // ✅ actually delete user
    const deletedUser = users.splice(userIndex, 1);

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully!",
        data: users,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "User could not be deleted",
      },
      { status: 500 },
    );
  }
}
