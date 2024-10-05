import { UserOutput } from "../../types/users";
import { getUserById } from "../models/users-model";

export const getUserByIdService = async (userId: string): Promise<UserOutput | null> => {
	const user = await getUserById(userId);

	if (user) {
		return user;
	}

	return null;
};
