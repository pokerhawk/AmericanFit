import api from "./api";

type GetSalesProps = {
    rows: number;
    page: number;
    id: string | undefined;
}

type CreateSaleProps = {
    userId: string | undefined;
    saleDate: string;
    transactionValue: number;
    paymentMethod: string;
    quantity: number;
    commissionOption: boolean;
    clientAddress: Object;
}

export const createSale = async ({
    userId, saleDate, transactionValue, paymentMethod, quantity, commissionOption, clientAddress
}:CreateSaleProps) => {
    try {
        const response = await api.post(`/sales/create`, 
        {userId, saleDate, transactionValue, paymentMethod, quantity, commissionOption, clientAddress}
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSales = async ({
    page, rows, id
}:GetSalesProps) => {
    try {
        const response = await api.get(`/sales/get`, {
            params: {page, rows, id}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllSalesById = async (id:string | undefined) => {
    try {
        const response = await api.get(`/sales/getAllSalesById`, {
            params: {id}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPendingSales = async (page:number, rows:number, businessId:string | undefined) => {
    try {
        const response = await api.get(`/sales/pending`, {
            params: {page, rows, businessId}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateSaleStatus = async (saleId:string, status: 'pending' | 'denied' | 'confirmed') => {
    try {
        const response = await api.post(`/sales/updateStatus`, 
        {saleId, status}
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}