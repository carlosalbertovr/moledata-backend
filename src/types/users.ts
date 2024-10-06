import { User } from "@prisma/client";

/**
 * Database use only
 */
type UserRecord = User;

type UserOutput = Omit<UserRecord, "is_deleted">;

type UserCreateInput = Pick<UserRecord, "email" | "fullname" | "country"> & { password: string };

type UserUpdateInput = Partial<Omit<UserRecord, "id">>;

export { UserRecord, UserOutput, UserCreateInput, UserUpdateInput };
