import api from "./api";

export type dateProps = 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'lastYear' | 'allTime'

type BusinessCreateTransactionProps = {
    businessId: string | undefined;
    flowValue: number;
    flowDescription: string;
    flowType: string;
    extraDescription: string;
}

type TransactionsProps = {
    rows: number;
    page: number;
    businessId: string | undefined;
}

export const getBusiness = async () => {
    try {
        const response = await api.get(`/business/getAll`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const businessCreateTransaction = async ({
    businessId, flowValue, flowDescription, flowType, extraDescription
}:BusinessCreateTransactionProps) => {
    try {
        const response = await api.post(`/business/createTransaction`,
        {businessId, flowValue, flowDescription, flowType, extraDescription}
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getTransactions = async ({
    rows, page, businessId
}:TransactionsProps) => {
    try {
        const response = await api.get(`/business/getTransactions`, {
            params: {rows, page, businessId}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBusinessWallet = async (id:string | undefined) => {
    try {
        const response = await api.get(`/business/wallet`, {
            params: {id}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBusinessROI = async (id:string | undefined, type:dateProps) => {
    try {
        const response = await api.get(`/business/roi`, {
            params: {id, type}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}