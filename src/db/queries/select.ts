import { asc, count, eq, getTableColumns } from "drizzle-orm";
import { db } from "../index";
import { SelectUser, postsTable, usersTable } from "../schema";
import { Event } from "@/types/events";

export async function getUserByEmail(email: SelectUser["email"]): Promise<
  Array<{
    id: number;
    name: string;
    email: string;
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.email, email));
}
export async function getEventsByUserEmail(email: SelectUser["email"]) {
  return db.select().from(postsTable).where(eq(postsTable.email, email));
}
