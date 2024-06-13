export type TransactionsProps = {
    id: string;
    createdBy: string;
    createdById: string;
    flowValue: number;
    flowDescription: string;
    flowType: string;
    extraDescription: string;
    createdAt: string;
}

export type OrderData = {
    data: TransactionsProps[]
    total: TotalProps[];
    count: number;
    currentPage: number;
    nextPage: number;
    prevPage: number;
    lastPage: number;
}

export type TotalProps = {
    name: string;
    revenue: number;
    expense: number;
}