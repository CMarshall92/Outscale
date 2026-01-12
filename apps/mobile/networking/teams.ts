import { GET, POST } from "./handler";

export const fetchTeams = async (userId: string) =>
  await GET(`${process.env.EXPO_PUBLIC_CORE_BASEURL}/teams?userId=${userId}`);

export interface CreateTeamResponse {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    referenceCode: string | null;
}
export const createTeam = async (
  userId: string | undefined, 
  teamData: { name: string; description: string }
): Promise<CreateTeamResponse | null> =>
  await POST<CreateTeamResponse>(`${process.env.EXPO_PUBLIC_CORE_BASEURL}/teams/create`, {
    userId,
    ...teamData,
  });