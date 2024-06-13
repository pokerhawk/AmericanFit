import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { CreateSalesDto } from './dto/create-sales.dto';
import { transformDate } from 'src/utils/date/adjust-date';
import { UpdateSaleDto } from './dto/update-sale-status.dto';

@Injectable()
export class SalesService {
    constructor(
        private readonly prisma: ClientService,
    ){}

    async create(salePayload: CreateSalesDto){
        const saleDate = transformDate(salePayload.saleDate)
        const sale = {
            ...salePayload,
            saleDate: saleDate,
            transactionValue: Number(salePayload.transactionValue * 100)
        };
        const user = await this.prisma.user.findUnique({
            where:{id: sale.userId},
            select: {
                id: true,
                name: true,
                commission: true,
                businessId: true,
                business: {
                    select: {
                        businessWallet: {
                            select: {
                                id: true,
                                balance: true,
                                revenue: true,
                                expense: true
                            }
                        }
                    }
                },
                userCommissionWallet:{
                    select: {
                        id: true,
                        commissionToBePaid: true
                    }
                }
            }
        });

        let newTransaction:any;
        let createSale:any;
        let updateWallet:any;
        let updateUserCommissionWallet:any;
        let newWalletHistory:any;

        if(sale.commissionOption === true){
            createSale = await this.prisma.sale.create({
                data: {
                    userId: sale.userId,
                    saleDate: sale.saleDate,
                    transactionValue: sale.transactionValue,
                    commission: (user.commission/2),
                    commissionValue: ((user.commission/2) * sale.transactionValue)/100,
                    paymentMethod: sale.paymentMethod,
                    quantity: sale.quantity
                }
            })
        } else {
            if (sale.paymentMethod === "Pix"){//Cria clientAddress toda vez msm se é repetido
                const clientAddress = await this.prisma.clientAddress.create({
                    data: {
                        name: sale.clientAddress.name,
                        phone: sale.clientAddress.phone,
                        zipcode: sale.clientAddress.zipcode,
                        address: sale.clientAddress.address,
                        number: sale.clientAddress.number,
                        neighborhood: sale.clientAddress.neighborhood,
                        city: sale.clientAddress.city,
                        state: sale.clientAddress.state,
                        complement: sale.clientAddress.complement,
                        deliveryDate: new Date(sale.clientAddress.deliveryDate)
                    }
                })
                createSale = await this.prisma.sale.create({
                    data: {
                        userId: sale.userId,
                        saleDate: sale.saleDate,
                        transactionValue: sale.transactionValue,
                        commission: user.commission,
                        commissionValue: (user.commission * sale.transactionValue)/100,
                        paymentMethod: sale.paymentMethod,
                        quantity: sale.quantity,
                        status: "confirmed",
                        clientAddressId: clientAddress.id
                    }
                })
                updateWallet = await this.prisma.businessWallet.update({
                    where: {businessId: user.businessId},
                    data: {
                        balance: user.business.businessWallet.balance + sale.transactionValue,
                        revenue: user.business.businessWallet.revenue + sale.transactionValue
                    }
                })
                newWalletHistory = await this.prisma.businessWalletHistory.create({
                    data:{
                        businessWalletId: user.business.businessWallet.id,
                        balance: user.business.businessWallet.balance + sale.transactionValue,
                        expense: user.business.businessWallet.expense,
                        revenue: user.business.businessWallet.revenue + sale.transactionValue
                    }
                })
                updateUserCommissionWallet = await this.prisma.userCommissionWallet.update({
                    where:{id: user.userCommissionWallet.id},
                    data:{
                        commissionToBePaid: user.userCommissionWallet.commissionToBePaid + ((user.commission * sale.transactionValue)/100)
                    }
                })
                newTransaction = await this.prisma.businessTransaction.create({
                    data: {
                        createdBy: user.name,
                        createdById: user.id,
                        flowValue: sale.transactionValue,
                        flowDescription: "sale",
                        flowType: "revenue",
                        extraDescription: "Venda de Usuário",
                        businessWalletId : user.business.businessWallet.id,
                        businessId: user.businessId
                    }
                })
            } else {
                createSale = await this.prisma.sale.create({
                    data: {
                        userId: sale.userId,
                        saleDate: sale.saleDate,
                        transactionValue: sale.transactionValue,
                        commission: user.commission,
                        commissionValue: (user.commission * sale.transactionValue)/100,
                        paymentMethod: sale.paymentMethod,
                        quantity: sale.quantity
                    }
                })
            }
        }
        
        return 'Venda criada com sucesso!'
    }

    async userSales(rows:number, page:number, id:string){
        const [sales, salesCount] = await this.prisma.$transaction([
            this.prisma.sale.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: rows,
                skip: (page-1)*rows,
                where:{userId: id},
                select:{
                    saleDate: true,
                    transactionValue: true,
                    commission: true,
                    commissionValue: true,
                    quantity: true,
                    status: true,
                    paymentMethod: true,
                    clientAddress: true
                }
            }),
            this.prisma.sale.count({
                where:{userId: id}
            })
        ])
        
        return {
            data: sales,
            count: salesCount,
            currentPage: page,
            nextPage: (page+1)>(salesCount/rows)?page:page+1,
            prevPage: (page-1)<0?page:page-1,
            lastPage: Math.ceil(salesCount/rows)
        }
    }

    async getAllSalesById(id:string){
        const values = await this.prisma.sale.findMany({
            where: {userId: id},
            select:{
                transactionValue: true,
                commissionValue: true,
                status: true
            }
        })

        const processedTransaction = values.map(prop=>{
            if(prop.status === 'confirmed'){
                return Number(prop.transactionValue/100);
            }
            return 0
        }).reduce((partialSum, a) => partialSum + a, 0)

        const processedCommission = values.map(prop=>{
            if(prop.status === 'confirmed'){
                return Number(prop.commissionValue/100);
            }
            return 0
        }).reduce((partialSum, a) => partialSum + a, 0)

        return {
            totalTransaction: processedTransaction,
            totalCommission: processedCommission
        }
    }

    async pendingSales(rows:number, page:number, businessId:string){
        const [pendingSales, pedingSalesCount] = await this.prisma.$transaction([
            this.prisma.sale.findMany({
                orderBy: {
                    saleDate: 'desc'
                },
                take: rows,
                skip: (page-1)*rows,
                where:{
                    status: 'pending',
                    user:{
                        businessId: businessId
                    }
                },
                select:{
                    id: true,
                    saleDate: true,
                    transactionValue: true,
                    commission: true,
                    commissionValue: true,
                    paymentMethod: true,
                    quantity: true,
                    user: {
                        select:{
                            name: true
                        }
                    }
                }
            }),
            this.prisma.sale.count({
                where:{
                    status: 'pending',
                    user:{
                        businessId: businessId
                    }
                }
            })
        ])

        return {
            data: pendingSales,
            count: pedingSalesCount,
            currentPage: page,
            nextPage: (page+1)>(pedingSalesCount/rows)?page:page+1,
            prevPage: (page-1)<0?page:page-1,
            lastPage: Math.ceil(pedingSalesCount/rows)
        }
    }

    async updateSaleStatus(updateStatusPayload: UpdateSaleDto){
        const sale = await this.prisma.sale.findUnique({
            where:{id: updateStatusPayload.saleId}
        })
        const user = await this.prisma.user.findUnique({
            where:{id: sale.userId},
            select:{
                id: true,
                name: true,
                businessId: true,
                userCommissionWallet:{
                    select: {
                        commissionToBePaid: true
                    }
                }
            }
        })
        const businessWallet = await this.prisma.businessWallet.findUnique({
            where:{businessId: user.businessId},
            select: {
                id: true,
                balance: true,
                revenue: true,
                expense: true
            }
        })
        
        const updateSale = await this.prisma.sale.update({
            where:{id: updateStatusPayload.saleId},
            data: {
                status: updateStatusPayload.status
            }
        })
        
        if(updateStatusPayload.status != 'denied'){
            const newTransaction = await this.prisma.businessTransaction.create({
                data: {
                    createdBy: user.name,
                    createdById: sale.userId,
                    flowValue: sale.transactionValue,
                    flowDescription: "sale",
                    flowType: "revenue",
                    extraDescription: "Venda de Usuário",
                    businessWalletId : businessWallet.id,
                    businessId: user.businessId
                }
            })
    
            const updateUserCommissionWallet = await this.prisma.userCommissionWallet.update({
                where:{userId: user.id},
                data:{
                    commissionToBePaid: user.userCommissionWallet.commissionToBePaid + sale.commissionValue
                }
            })
    
            const updateBusinessWallet = await this.prisma.businessWallet.update({
                where:{id:businessWallet.id},
                data:{
                    balance: businessWallet.balance + sale.transactionValue,
                    revenue: businessWallet.revenue + sale.transactionValue
                }
            })

            await this.prisma.businessWalletHistory.create({
                data:{
                    businessWalletId: businessWallet.id,
                    balance: businessWallet.balance + sale.transactionValue,
                    expense: businessWallet.expense,
                    revenue: businessWallet.revenue + sale.transactionValue
                }
            })
    
            return {
                updateSale,
                newTransaction,
                updateBusinessWallet,
                updateUserCommissionWallet
            }
        } else {
            return updateSale
        }
    }
}