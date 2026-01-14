export interface Team {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  referenceCode: string | null;
}