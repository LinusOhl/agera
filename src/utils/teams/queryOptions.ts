import { useMutation } from "@tanstack/react-query";
import { createTeamFn } from "./teams.functions";

export const useCreateTeamMutation = () => {
  return useMutation({
    mutationFn: createTeamFn,
  });
};
