import { TOrder } from "./orderType";

type TStatus = 'open' | 'generatingPrice' | 'awaitingSending' | 'generatingTags' | 'processing' | 'finished' | 'error' | 'warning';

export type TOrderGroup = {
    code: string
    createdAt: string
    orders?: TOrder[]
    price: number
    status: TStatus
}