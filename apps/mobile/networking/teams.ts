import { Team } from "@/types/team";
import { GET, POST } from "./handler";

export const fetchTeamByUserId = async (userId: string | undefined): Promise<Team[] | null> =>
  await GET<Team[]>(`${process.env.EXPO_PUBLIC_CORE_BASEURL}/teams?userId=${userId}`);

export const createTeam = async (
  userId: string | undefined, 
  teamData: { name: string; description: string }
): Promise<Team | null> =>
  await POST<Team>(`${process.env.EXPO_PUBLIC_CORE_BASEURL}/teams/create`, {
    userId,
    ...teamData,
  });