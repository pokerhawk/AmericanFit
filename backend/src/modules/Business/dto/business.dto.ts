import { IsEnum, IsNumber, IsObject, IsString } from "class-validator";

enum EnumFlowType {
    revenue = 'revenue',
    expense = 'expense'
}

enum EnumFlowDescription {
    sale = 'sale',
    deposit = 'deposit',
    withdraw = 'withdraw',
    commission = 'commission',
    tax = 'tax',
    supplier = 'supplier',
    pots = 'pots'
}

export class CreateTransactionDto {
    @IsString()
    businessId: string;

    @IsNumber()
    flowValue: number;

    @IsEnum(EnumFlowDescription)
    flowDescription: EnumFlowDescription;

    @IsEnum(EnumFlowType)
    flowType: EnumFlowType;

    @IsString()
    extraDescription: string;
}