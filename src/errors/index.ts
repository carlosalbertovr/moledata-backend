// Import the ErrorRequestHandler type from express
import { ErrorRequestHandler } from "express";
import { ValidateError } from "tsoa";

export interface DetailedFieldError {
	message: string;
	status: number;
}

export class DetailedValidateError extends ValidateError {
	fields: { [name: string]: DetailedFieldError };

	constructor(fields: { [name: string]: DetailedFieldError }, message: string) {
		super({}, message); // Call the base class constructor with empty fields
		this.fields = fields;
		Object.setPrototypeOf(this, DetailedValidateError.prototype); // Ensure the prototype chain is correct
	}
}

// Explicitly type the error handler as ErrorRequestHandler and make it async
export const errorHandler: ErrorRequestHandler = async (err, req, res, next): Promise<void> => {
	console.error(`❌ Caught Error for ${req.path}:`, err);
	if (err instanceof DetailedValidateError) {
		console.error(`❌ Caught Validation Error for ${req.path}:`, err.fields);

		// Extract the highest-priority status code from the detailed field errors
		const status = Math.min(...Object.values(err.fields).map((field) => field.status));

		res.status(status).json({
			message: "Validation Failed",
			details: err.fields,
		});
	} else if (err instanceof ValidateError) {
		console.error(`❌ Caught Validation Error for ${req.path}:`, err.fields);
		res.status(422).json({
			message: "Validation Failed",
			details: err?.fields,
		});
	} else if (err instanceof Error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	} else {
		// If none of the above, pass it to the next middleware
		next();
	}
};
