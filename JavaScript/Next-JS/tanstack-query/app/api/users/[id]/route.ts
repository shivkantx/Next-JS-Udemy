import { NextResponse } from "next/server";
import { users } from "../data";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numericId = Number(id);

  const index = users.findIndex((user) => user.id === numericId);

  if (index === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  users.splice(index, 1);

  return NextResponse.json({ message: "User deleted successfully" });
}
