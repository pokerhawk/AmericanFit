export type TUserPayload = {
    sub: string;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
}