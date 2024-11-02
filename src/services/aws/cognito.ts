import {
	AdminCreateUserCommand,
	CognitoIdentityProviderClient,
	AdminSetUserPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";

import { getSecretStringAsJson } from "./secrets-manager";
import { apiConfig } from "../../config";

export const getCognitoUserPoolId = async () => {
	if (apiConfig.envName === "local") return process.env.COGNITO_USER_POOL_ID;

	const secret = await getSecretStringAsJson(apiConfig.secret_id);

	return secret.COGNITO_USER_POOL_ID;
};

const cognitoClient = new CognitoIdentityProviderClient({
	region: apiConfig.aws_region,
	credentials: {
		accessKeyId: apiConfig.aws_access_key,
		secretAccessKey: apiConfig.aws_secret_access_key,
	},
});

interface AdminCreateUserParams {
    email: string;
    fullname: string;
    password?: string;
}

export const adminCreateUser = async (params: AdminCreateUserParams) => {
    try {
        const userPoolId = await getCognitoUserPoolId();

        const createUserCommand = new AdminCreateUserCommand({
            UserPoolId: userPoolId,
            Username: params.email,
            UserAttributes: [
                { Name: "email", Value: params.email },
                { Name: "name", Value: params.fullname },
                { Name: "email_verified", Value: "true" },
            ],
        });

        await cognitoClient.send(createUserCommand);

        // Set password if provided
        if (params.password) {
            const setPasswordCommand = new AdminSetUserPasswordCommand({
                UserPoolId: userPoolId,
                Username: params.email,
                Password: params.password,
                Permanent: true,
            });
            await cognitoClient.send(setPasswordCommand);
        }

        console.log(`✅ User with email ${params.email} created successfully in Cognito.`);
    } catch (error) {
        console.error("☁️❌ Error creating user in Cognito:", error);
        throw new Error(`☁️❌ Failed to create user: ${error}`);
    }
};