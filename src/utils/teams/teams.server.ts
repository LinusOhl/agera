import { prisma } from "~/lib/prisma";
import type { TeamType } from "./schema";

export const createTeam = async (data: TeamType, userId: string) => {
  const team = await prisma.team.create({
    data: {
      name: data.name,
      ownerId: userId,
    },
  });

  return team;
};
