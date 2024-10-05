import { User } from "@prisma/client";

/**
 * Database use only
 */
type UserRecord = User;

type UserOutput = Omit<UserRecord, "is_deleted">;

export { UserRecord, UserOutput };
