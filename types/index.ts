import { User } from "@prisma/client";

export type SafeUser = Omit<
User,
 "createdAt" | "updateAt" | "emailVerified"
 >& {
  createdAt: string ;
  updateAt: string| undefined   ;
  emailVerified: string | null;
 }