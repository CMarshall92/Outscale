import { POST } from "./handler";

interface User {
  firstName: string | null;
  lastName: string | null;
  id: string;
  clerkId: string;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export const createDBUser = async (
  userId: string | null, 
  firstName: string| null, 
  lastName: string| null, 
  emailAddress: string| null
): Promise<User | null> => await POST(
  `${process.env.EXPO_PUBLIC_CORE_BASEURL}/users/create`, 
  { userId, firstName, lastName, emailAddress }
);