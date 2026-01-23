import { queryOptions, useMutation } from "@tanstack/react-query";
import { createTaskFn, fetchTasksFn } from "./tasks.functions";

export const useCreateTaskMutation = () => {
  return useMutation({
    mutationFn: createTaskFn,
    onSuccess: () => console.log("successfully created task!"),
  });
};

export const tasksQueryOptions = () =>
  queryOptions({
    queryKey: ["tasks"],
    queryFn: () => fetchTasksFn(),
  });
