// src/users/usersController.ts
import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";

import { UserCreateInput, UserOutput } from "../../types/users";
import { createUserService, getUserByIdService } from "../services/users-service";
import { getUserByIdValidations, createUserValidations } from "../validations/users-validations";

@Tags("User service")
@Route("users")
export class UsersController extends Controller {
	/**
	 * Retrieves the details of an existing user.
	 * Supply the unique user ID from either and receive corresponding user details.
	 * @param userId The user's identifier
	 */
	@Get("{userId}")
	public async getUser(@Path() userId: string): Promise<UserOutput | null> {
		await getUserByIdValidations(userId);
		return getUserByIdService(userId);
	}
	@Post()
	public async createUser(@Body() payload: UserCreateInput): Promise<UserOutput> {
		await createUserValidations(payload);
		return createUserService(payload);
	}
}
