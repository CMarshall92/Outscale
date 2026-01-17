import { POST } from "./handler";

export const connectGoogle = async (
  userId: string,
  refreshToken: string
) => {
  return POST(
    `${process.env.EXPO_PUBLIC_CORE_BASEURL}/connections/google/connect`,
    { userId, refreshToken }
  );
};
