// src/users/usersController.ts
import { Controller, Get, Path, Route, Tags } from "tsoa";

import { UserOutput } from "../../types/users";
import { getUserByIdService } from "../services/users-service";
import { getUserByIdValidations } from "../validations/users-validations";

@Tags("User service")
@Route("users")
export class UsersController extends Controller {
	@Get("{userId}")
	public async getUser(@Path() userId: string): Promise<UserOutput | null> {
		await getUserByIdValidations(userId);
		return getUserByIdService(userId);
	}
}
