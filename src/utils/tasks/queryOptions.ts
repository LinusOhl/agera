import { queryOptions, useMutation } from "@tanstack/react-query";
import { queryClient } from "~/router";
import {
  createTaskFn,
  deleteTaskFn,
  fetchTaskFn,
  fetchTasksFn,
} from "./tasks.functions";

export const useCreateTaskMutation = () => {
  return useMutation({
    mutationFn: createTaskFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

export const tasksQueryOptions = () =>
  queryOptions({
    queryKey: ["tasks"],
    queryFn: () => fetchTasksFn(),
  });

export const taskQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["tasks", id],
    queryFn: () => fetchTaskFn({ data: { id } }),
  });

export const useDeleteTaskMutation = () => {
  return useMutation({
    mutationFn: deleteTaskFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
