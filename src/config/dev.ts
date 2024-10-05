import { ApiConfiguration } from ".";

export const devConfiguration: ApiConfiguration = {
	envName: "dev",
	port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
	aws_region: "eu-central-1",
	secret_id: "moledata-dev-secrets",
	cognito_client_id: "2219857i294ppeqmgsu2nk2clf",
	cognito_signing_key_url: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_JwE1Ny341/.well-known/jwks.json",
	cognito_token_issuer: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_JwE1Ny341",
};
