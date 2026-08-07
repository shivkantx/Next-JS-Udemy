"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Todo from "@/model/todo";
import { createTodoSchema } from "@/validation/todo";
import { success } from "zod";

export async function createTodo(data) {
  try {
    // Connect to database first
    await connectDB();

    // Validate incoming data
    const validatedData = createTodoSchema.parse(data);

    // Save todo
    const todo = await Todo.create(validatedData);

    // Revalidate the home page
    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.error("Error creating todo:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create todo",
    };
  }
}

export async function getTodos() {
  try {
    await connectDB();

    const todos = await Todo.find({}).sort({ createdAt: -1 });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todos)),
    };
  } catch (error) {
    console.log("Error fetching todos", error);
    return {
      success: false,
      error: "Failed to fetch todos",
    };
  }
}
