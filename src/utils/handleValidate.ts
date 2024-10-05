import { DetailedFieldError, DetailedValidateError } from "../errors";

export const handleValidate = async (
	validationFunction: (errors: { [name: string]: DetailedFieldError }) => Promise<void>,
): Promise<void> => {
	const errors: { [name: string]: DetailedFieldError } = {};
	await validationFunction(errors);
	if (Object.keys(errors).length > 0) {
		throw new DetailedValidateError(errors, "Validation Error");
	}
};
