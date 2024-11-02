// import type { JwtPayload } from 'jsonwebtoken';


// to make the file a module and avoid the TypeScript error
export { }

declare module 'jsonwebtoken' {
    interface JwtPayload {
        "cognito:username"?: string;
        email?: string;
        identities: Array<{
            providerName: string;
            providerType: string;
            issuer: string;
            primary: string;
            dateCreated: string;
        }>
    }
}

