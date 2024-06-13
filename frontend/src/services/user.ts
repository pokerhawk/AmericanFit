import { Params } from "react-router-dom";
import api from "./api";
import { dateProps } from "./business";

export const CreateUser = async (
    name:string, document:string, birthDate:string, email:string, password:string
    ) => {
    try {
        const response = await api.post(`/user/create`,
            {name, email, password, birthDate, document}
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUsers = async (rows?:number, page?:number, businessId?:string) => {
    try {
        const response = await api.get(`/user/getAll`, {
            params: {rows, page, businessId}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSellersList = async (rows:number, page:number, type:dateProps) => {
    try {
        const response = await api.get(`/user/sellersList`, {
            params: {rows, page, type}
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUser = async (id:any) => {
    try {
        const response = await api.get(`/user/getOne`, {
            params: {id}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}