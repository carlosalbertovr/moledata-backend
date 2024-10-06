import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

import { apiConfig } from "../../config";

const REGION = apiConfig.aws_region;
const client = new SecretsManagerClient({ region: REGION });

export const getSecretStringAsString = async (secretId: string) => {
	const command = new GetSecretValueCommand({ SecretId: secretId });
	const response = await client.send(command);
	return response.SecretString;
};

export const getSecretStringAsJson = async (secretId: string) => {
	const secretAsStr = await getSecretStringAsString(secretId);
	return JSON.parse(secretAsStr || "{}");
};
