import api from './api';

type SingInRequestProps = {
    email: string;
    password: string;
}

type SignUpRequestProps = {
    name: string;
    email: string;
    password: string;
    accountType: string;
    pix?: string;
    businessId?: string;
}

export const COOKIE_TOKEN = 'cookie_token';
export const COOKIE_ACCESS_TOKEN = 'cookie_access_token';

export const signInRequest = async ({ email, password }: SingInRequestProps) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const signUpRequest = async ({ name, email, password, accountType, pix, businessId }:SignUpRequestProps) => {
    if(accountType === "Empresa"){
        try {
            const response = await api.post('/auth/registerBusiness', { name: name, email: email, password: password});
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    if(accountType === "Vendedor"){
        try {
            const response = await api.post('/auth/registerUser', { name: name, email: email, password: password, pix: pix, businessId: businessId });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export const updateUserCommission = async (id:string, commission: number) => {
    try {
        const response = await api.patch(`/auth/updateUserCommission`, {
            params: {id, commission}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}