import { createTodo } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodoSchema } from "@/validation/todo";

export const todoKeys = {
  all: ["todo"],
  lists: () => [...todoKeys.all, "list"],
};

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const addTodo = useTodoStore((state) => state.addTodo);

  return useMutation({
    mutationFn: createTodo,

    onSuccess: (result) => {
      if (result?.success) {
        // Update Zustand store
        addTodo(result.data);

        // Refresh React Query cache
        queryClient.invalidateQueries({
          queryKey: todoKeys.lists(),
        });
      }
    },

    onError: (error) => {
      console.error("Failed to create todo:", error);
    },
  });
}
