import type { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";

const removeBearerMiddleware = (req: Request, _: Response, next: NextFunction) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.replace("Bearer ", "");
		req.headers.authorization = token;
		const payload = decode(token);

		if (payload && typeof payload === "object" && !Array.isArray(payload)) {
			if (payload.email) {
				req.user_email = payload.email;
			}
		} 
    }
	next();
};

export { removeBearerMiddleware };
