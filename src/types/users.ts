import { User } from "@prisma/client";

/**
 * Database use only
 */
type UserRecord = User;

type UserOutput = UserRecord;

export { UserRecord, UserOutput };
