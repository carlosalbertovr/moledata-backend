import { handleValidate } from "../../utils/handleValidate";
import { checkIfUserExist } from "../models/users-model";

export const getUserByIdValidations = async (userId: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const restaurantExists = await checkIfUserExist(userId);
		if (!restaurantExists) {
			errors.user = { message: "USER_DOES_NOT_EXIST", status: 404 };
		}
	});
};
