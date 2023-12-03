interface GoogleTokenResult {
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
}
export declare const getGoogleOAuthToken: ({ code }: {
    code: string;
}) => Promise<GoogleTokenResult>;
interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}
export declare const getGoogleUser: ({ id_token, access_token, }: {
    id_token: string;
    access_token: string;
}) => Promise<GoogleUserResult>;
export {};
