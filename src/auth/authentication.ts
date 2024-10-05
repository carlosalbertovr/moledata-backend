import axios from "axios";
import { Request } from "express";
import jwt from "jsonwebtoken";
import jwkToPem, { JWK } from "jwk-to-pem";

import { apiConfig } from "../config";
import { DetailedValidateError } from "../errors";

interface IKey {
	kid: string;
	alg: string;
	kty: string;
	e: string;
	n: string;
	use: string;
}

export const expressAuthentication = async (request: Request, securityName: string, _?: Array<string>) => {
	if (securityName === "cognito") {
		// Token must be available
		const authHeader = request.headers["authorization"];
		if (!authHeader) {
			throw new DetailedValidateError(
				{
					authorization: {
						message: "Authorization token is missing",
						status: 401,
					},
				},
				"Authentication failed",
			);
		}

		// Token must be decodeable
		const token = authHeader.replace("Bearer ", "");
		const decodedToken = jwt.decode(token, {
			complete: true,
		});
		if (!decodedToken) {
			throw new DetailedValidateError(
				{
					token: {
						message: "Token is invalid or could not be decoded",
						status: 401,
					},
				},
				"Invalid Token",
			);
		}

		// If auth check is disabled (for testing purposes), this is enough
		if (process.env.AUTH === "disabled" && typeof decodedToken.payload === "object" && decodedToken.payload.email) {
			return;
		}

		// Token kid must match at least one of the public keys
		const data = (await axios.get<{ keys: IKey[]; [k: string]: unknown }>(apiConfig.cognito_signing_key_url)).data;
		const key = data.keys.find((key) => {
			return key.kid === decodedToken["header"]["kid"];
		});
		if (!key) {
			throw new DetailedValidateError(
				{
					token: {
						message: "Token's key ID (kid) does not match any known keys",
						status: 401,
					},
				},
				"Invalid Token",
			);
		}

		// Token must be verified using key
		jwt.verify(
			token,
			jwkToPem(key as JWK),
			{
				algorithms: ["RS256"],
				audience: apiConfig.cognito_client_id,
				issuer: apiConfig.cognito_token_issuer,
			},
			(err) => {
				if (err) {
					console.error(err);
					throw new DetailedValidateError(
						{
							token: {
								message: "Token verification failed",
								status: 401,
							},
						},
						"Invalid Token",
					);
				}
			},
		);

		return;
	}

	// Handle unsupported security policies
	throw new DetailedValidateError(
		{
			security: {
				message: "Unsupported security policy",
				status: 403,
			},
		},
		"Security policy not implemented",
	);
};
