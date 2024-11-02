import dotenv from "dotenv";

import { ApiConfiguration } from ".";
dotenv.config();

export const devConfiguration: ApiConfiguration = {
	envName: "dev",
	port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
	aws_region: "eu-central-1",
	secret_id: "moledata-dev-secrets",
	aws_access_key: process.env.AWS_APP_ACCESS_KEY ? process.env.AWS_APP_ACCESS_KEY : "s3rv3r",
	aws_secret_access_key: process.env.AWS_APP_SECRET_ACCESS_KEY ? process.env.AWS_APP_SECRET_ACCESS_KEY : "s3rv3r",
	cognito_client_id: "7a6anncbu42ssfnn5t7fc3ef63",
	cognito_signing_key_url: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_wCAGopa2d/.well-known/jwks.json",
	cognito_token_issuer: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_wCAGopa2d",
};
