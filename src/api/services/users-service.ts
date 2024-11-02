import { adminCreateUser } from "../../services/aws/cognito";
import { UserCreateInput, UserOutput } from "../../types/users";
import { getUserById, createUser, getUserByEmail } from "../models/users-model";

export const getUserByIdService = async (userId: string): Promise<UserOutput | null> => {
	const user = await getUserById(userId);

	if (user) {
		return user;
	}

	return null;
};

export const createUserService = async (payload: UserCreateInput): Promise<UserOutput> => {
	const { password, ...createInput } = payload;
	await adminCreateUser({ email: payload.email, fullname: payload.fullname, password: password });
	const createdUser = await createUser(createInput);
	return createdUser;
};

export const getCurrentVolunteer = async (email: string): Promise<UserOutput | null> => {
	return await getUserByEmail(email);
};
