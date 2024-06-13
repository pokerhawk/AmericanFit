export type SectionProps = {
    title: string;
}

export type FinanceProps = {
    id: string;
    name: string;
    email: string;
    pix: string;
    commission: number;
    quantity: number;
}

export type OrderData = {
    data: FinanceProps[]
    count: number
    currentPage: number
    nextPage: number
    prevPage: number
    lastPage: number
}