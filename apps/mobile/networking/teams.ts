import { GET, POST } from "./handler";

export const fetchTeams = async (userId: string) =>
  await GET(`${process.env.EXPO_PUBLIC_CORE_BASEURL}/teams?userId=${userId}`);

export const createTeam = async (userId: string) =>
  await POST(`${process.env.EXPO_PUBLIC_CORE_BASEURL}/teams/create`, {
    userId,
  });