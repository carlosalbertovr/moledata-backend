import { UserCreateInput } from "../../types/users";
import { handleValidate } from "../../utils/handleValidate";
import { checkIfUserExist, checkIfEmailIsUsed } from "../models/users-model";

export const getUserByIdValidations = async (userId: string): Promise<void> => {
	await handleValidate(async (errors) => {
		const userExists = await checkIfUserExist(userId);
		if (!userExists) {
			errors.user = { message: "USER_DOES_NOT_EXIST", status: 404 };
		}
	});
};

export const createUserValidations = async (payload: UserCreateInput): Promise<void> => {
	await handleValidate(async (errors) => {
		// Check if the email is already used
		const emailIsUsed = await checkIfEmailIsUsed(payload.email);
		if (emailIsUsed) {
			errors.email = { message: "EMAIL_IS_ALREADY_USED", status: 409 };
		}

		// Validate that fullname is not longer than 50 characters
		if (payload.fullname.length > 50) {
			errors.fullname = { message: "FULLNAME_TOO_LONG", status: 400 }; // 400 Bad Request for invalid input
		}

		// Check if email format is valid (basic regex validation)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(payload.email)) {
			errors.email = { message: "INVALID_EMAIL_FORMAT", status: 400 };
		}

		// Ensure that the country field is not empty
		if (!payload.country || payload.country.trim().length === 0) {
			errors.country = { message: "COUNTRY_CANNOT_BE_EMPTY", status: 400 };
		}

		// Password validation: must be at least 8 characters long
		if (payload.password.length < 8) {
			errors.password = { message: "PASSWORD_TOO_SHORT", status: 400 }; // 400 Bad Request for invalid input
		}

		// Password specific validation: numbers, uppercase, lowercase, special characters
		const hasNumber = /\d/; // Contains at least 1 number
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Contains at least 1 special character
		const hasUppercase = /[A-Z]/; // Contains at least 1 uppercase letter
		const hasLowercase = /[a-z]/; // Contains at least 1 lowercase letter

		if (!hasNumber.test(payload.password)) {
			errors.password = { message: "PASSWORD_MUST_CONTAIN_NUMBER", status: 400 };
		}

		if (!hasSpecialChar.test(payload.password)) {
			errors.password = { message: "PASSWORD_MUST_CONTAIN_SPECIAL_CHARACTER", status: 400 };
		}

		if (!hasUppercase.test(payload.password)) {
			errors.password = { message: "PASSWORD_MUST_CONTAIN_UPPERCASE", status: 400 };
		}

		if (!hasLowercase.test(payload.password)) {
			errors.password = { message: "PASSWORD_MUST_CONTAIN_LOWERCASE", status: 400 };
		}
	});
};
