// src/users/usersController.ts
import { Controller, Get, Path, Route, Tags } from "tsoa";

@Tags("User service")
@Route("users")
export class UsersController extends Controller {
	@Get("{userId}")
	public async getUser(@Path() userId: number): Promise<string> {
		return `User of id: ${userId}`;
	}
}
