import dotenv from "dotenv";

import { ApiConfiguration } from ".";
dotenv.config();

export const localConfiguration: ApiConfiguration = {
	envName: "local",
	port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
	aws_region: "eu-central-1",
	secret_id: "moledata-dev-secrets",
	aws_access_key: process.env.AWS_ACCESS_KEY ? process.env.AWS_ACCESS_KEY : "s3rv3r",
	aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY : "s3rv3r",
	cognito_client_id: "2219857i294ppeqmgsu2nk2clf",
	cognito_signing_key_url: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_JhMGr5onT/.well-known/jwks.json",
	cognito_token_issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_JhMGr5onT",
};
