/**
 * UsersController handles user-related operations such as retrieving user details,
 * creating new users, and fetching the current user's profile.
 */
// src/users/usersController.ts
import { Body, Controller, Get, Path, Post, Request, Route, Security, Tags } from "tsoa";

import { DetailedValidateError } from "../../errors";
import { UserCreateInput, UserOutput } from "../../types/users";
import { ExpressRequest } from "../../utils/expressRequest";
import { createUserService, getCurrentVolunteer, getUserByIdService } from "../services/users-service";
import {
	getUserByIdValidations,
	createUserValidations,
	getCurrentProfileValidations,
} from "../validations/users-validations";

@Tags("User service")
@Route("users")
export class UsersController extends Controller {
	/**
	 * Retrieves a user by their ID.
	 *
	 * @param userId - The ID of the user to retrieve.
	 * @returns A promise that resolves to the user data if found, or null if not found.
	 * @throws Will throw an error if the user ID is invalid.
	 */
	@Get("{userId}")
	public async getUser(@Path() userId: string): Promise<UserOutput | null> {
		await getUserByIdValidations(userId);
		return getUserByIdService(userId);
	}
	/**
	 * Creates a new user.
	 *
	 * @param payload - The input data required to create a new user.
	 * @returns A promise that resolves to the created user's output data.
	 * @throws Will throw an error if the user creation validations fail.
	 */
	@Post()
	public async createUser(@Body() payload: UserCreateInput): Promise<UserOutput> {
		await createUserValidations(payload);
		return createUserService(payload);
	}
	/**
	 * Retrieves the current user's profile based on the email provided in the request.
	 *
	 * @param req - The request object containing the user's email.
	 * @returns A promise that resolves to the user's profile information or null if not found.
	 */
	@Get("profile/my-profile")
	@Security("cognito")
	public async getCurrentProfile(@Request() req: ExpressRequest): Promise<UserOutput | null> {
		if (!req.user_email) {
			throw new DetailedValidateError({ user: { message: "USER_DOES_NOT_EXIST", status: 404 } }, "Validation Error");
		}
		await getCurrentProfileValidations(req.user_email);
		return await getCurrentVolunteer(req.user_email!);
	}
}
