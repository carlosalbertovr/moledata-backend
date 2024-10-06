import dotenv from "dotenv";

import { devConfiguration } from "./dev";
import { localConfiguration } from "./local";

dotenv.config();

export interface ApiConfiguration {
	envName: "local" | "dev";
	port: number;
	secret_id: string;
	aws_region: string;
	aws_access_key: string;
	aws_secret_access_key: string;
	cognito_client_id: string;
	cognito_signing_key_url: string;
	cognito_token_issuer: string;
}

const env = process.env.ENV_NAME || "local";

let envConfig: ApiConfiguration;

switch (env) {
	case "dev":
		envConfig = devConfiguration;
		break;
	case "local":
		envConfig = localConfiguration;
		break;
	default:
		throw new Error("Invalid environment");
}

export const apiConfig = envConfig;
