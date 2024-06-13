type TDeliveryType = 'Standard' | 'Express' | 'StandardBulk' | 'SmallPackage' | 'ExpressBulk';

type TProviderImport = 'internal' | 'bling';

type TStep = 'CREATED' | 'SET_ADDRESS_ORIGIN' | 'SET_BOXES' | 'SET_DELIVERY_TYPES' | 'IN_ORDER_GROUP';

type TStatusDelivered = 'waiting_post' | 'posted' | 'sent' | 'out_delivery' | 'waiting_withdrawal' | 'delivered' | 'error' | 'warning' | 'info';

type TStatus = 'created' | 'sending' | 'in_romanian' | 'awaiting_sending' | 'sent' | 'delivered' | 'disapproved' | 'processing' | 'canceled' | 'warning' | 'error';

export type TOrder = {
    addressDestinyId: string
    addressOriginId: string
    bodyError: string
    code: string
    codeOffer: string
    codeOrderOrion: string
    createdAt: Date
    createdBy: string
    cubicWeight: number
    date: Date
    deletedAt: Date
    deliveryType: TDeliveryType
    depth: number
    errorAddress: boolean
    errorBox: boolean
    errorLead: boolean
    errorProduct: boolean
    forecastDelivery: null
    height: number
    id: string
    leadId: string
    message: null
    nameBox: "edit"
    nfe: null
    orderGroupId: string
    payment: true
    postOffice: null
    postOfficePlanId: string
    priceOffer: number
    priceShipping: number
    priceShippingCost: number
    providerId: null
    providerImport: TProviderImport
    quantity: number
    quantityProductOffer: number
    saleId: string
    shippingSellerSinerlogId: null
    status: TStatus
    statusDelivery: TStatusDelivered
    step: TStep
    trackingCode: string
    updatedAt: Date
    weight: number
    width: number
}