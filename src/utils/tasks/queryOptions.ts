import { useMutation } from "@tanstack/react-query";
import { createTaskFn } from "./tasks.functions";

export const useCreateTaskMutation = () => {
  return useMutation({
    mutationFn: createTaskFn,
    onSuccess: () => console.log("successfully created task!"),
  });
};
