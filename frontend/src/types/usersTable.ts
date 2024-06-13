export type SectionProps = {
    title: string;
    subTitle?: string;
}

export type UsersProps = {
    id: string;
    name: string;
    email: string;
    pix: string;
    commission: number;
    quantity: number;
    businessId: string;
}

export type totalProps = {
    name: string;
    commission: number;
    quantity: number;
}

export type OrderData = {
    data: UsersProps[]
    count: number
    currentPage: number
    nextPage: number
    prevPage: number
    lastPage: number
}