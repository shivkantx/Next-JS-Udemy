import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(request, context) {
  await dbConnect();

  try {
    // unwrap params properly
    const { id } = await context.params;

    console.log("DELETE ID:", id);

    // validate id
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 },
      );
    }

    const deleted = await Note.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
