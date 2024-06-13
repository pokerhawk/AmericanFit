import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { CreateTransactionDto } from './dto/business.dto';
import { fixedDate, dateProps } from 'src/utils/date/adjust-date';

@Injectable()
export class BusinessService {
    constructor(
        private readonly prisma: ClientService,
    ){}

    async getAll(){
        return await this.prisma.business.findMany({
            select:{
                id:true,
                company: true
            }
        })
    }
    
    async businessCreateTransaction(body:CreateTransactionDto){
        const business = await this.prisma.business.findUnique({
            where:{id: body.businessId},
            select:{
                company: true,
                businessWallet: {
                    select: {
                        id: true,
                        balance: true,
                        revenue: true,
                        expense: true
                    }
                }
            }
        })

        let newBalance:number;
        let newRevenue = business.businessWallet.revenue;
        let newExpense = business.businessWallet.expense;

        if(body.flowType === "revenue"){
            newBalance = business.businessWallet.balance + Number(body.flowValue * 100)
            newRevenue += Number(body.flowValue * 100)
        }
        if(body.flowType === "expense"){
            newBalance = business.businessWallet.balance - Number(body.flowValue * 100)
            newExpense += Number(body.flowValue * 100)
            if (body.flowDescription === 'commission') {
                const userId = body.extraDescription.split(' ')[1]
                const userCommissionWallet = await this.prisma.userCommissionWallet.findUnique({
                    where:{userId: userId},
                    select:{
                        commissionToBePaid: true
                    }
                })
                const newUserCommissionBalance = userCommissionWallet.commissionToBePaid - Number(body.flowValue * 100)
                await this.prisma.userCommissionWallet.update({
                    where:{userId: userId},
                    data:{
                        commissionToBePaid: newUserCommissionBalance
                    }
                })
            }
        }
        
        const balanceUpdated = await this.prisma.businessWallet.update({
            where: {businessId: body.businessId},
            data: {
                balance: newBalance,
                revenue: newRevenue,
                expense: newExpense
            }
        })

        const newWalletHistory = await this.prisma.businessWalletHistory.create({
            data: {
                businessWalletId: balanceUpdated.id,
                balance: newBalance,
                revenue: newRevenue,
                expense: newExpense
            }
        })

        const newTransaction = await this.prisma.businessTransaction.create({
            data: {
                createdBy: business.company,
                createdById: body.businessId,
                flowValue: Number(body.flowValue * 100),
                flowDescription: body.flowDescription,
                flowType: body.flowType,
                extraDescription: body.extraDescription,
                businessWalletId : business.businessWallet.id,
                businessId: body.businessId
            }
        })

        return {
            newTransaction,
            balanceUpdated,
            newWalletHistory
        }
    }

    async getBusinessWallet(id:string){
        const wallet = await this.prisma.businessWallet.findUnique({
            where: {businessId: id},
        })

        return {
            id: wallet.id,
            balance: Number(wallet.balance/100),
            expense: Number(wallet.expense/100),
            revenue: Number(wallet.revenue/100),
            businessId: wallet.businessId
        }
    }

    async getBusinessROI(id:string, type:dateProps){
        const wallet = await this.prisma.businessWallet.findFirst({
            where: {businessId: id},
            select: {
                balance: true,
                revenue: true,
                expense: true
            }
        })
        const transactions = await this.prisma.businessTransaction.findMany({
            where:{
                businessId: id,
                createdAt:{
                    gte: fixedDate(type, 'gte'),
                    lte: fixedDate(type, 'lte')
                }
            }
        })
        const balance = (wallet.balance)/100;
        const revenue = (wallet.revenue)/100; //Dar uma conferida
        const expense = (wallet.expense)/100;
        const transactionExpense = transactions.map(prop=>{
            if(prop.flowType != "revenue"){
                return Number(prop.flowValue/100)
            }
            return 0;
        }).reduce((partialSum, a) => partialSum + a, 0)

        return {
            roiValue: ((balance + transactionExpense) - transactionExpense),
            roiPercentage: (((balance - transactionExpense)/transactionExpense) * 100).toFixed(2)
        }
    }

    async getTransactions(rows:number, page:number, businessId:string){
        if(rows === 0 && page === 0){
            const transactions = await this.prisma.businessTransaction.findMany({
                where:{businessId: businessId}
            })
            const revenue = transactions.map(prop=>{
                if(prop.flowType === 'revenue'){
                    return Number(prop.flowValue/100)
                }
                return 0;
            }).reduce((partialSum, a) => partialSum + a, 0)
            const expense = transactions.map(prop=>{
                if(prop.flowType === 'expense'){
                    return Number(prop.flowValue/100)
                }
                return 0;
            }).reduce((partialSum, a) => partialSum + a, 0)

            return {
                name: "Total",
                revenue,
                expense
            }
        }
        const [transactions, transactionsCount, allTransactions] = await this.prisma.$transaction([
            this.prisma.businessTransaction.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                where:{businessId: businessId},
                skip: (page-1)*rows,
                take: rows,
                select:{
                    id: true,
                    createdBy: true,
                    createdById: true,
                    flowValue: true,
                    flowDescription: true,
                    flowType: true,
                    extraDescription: true,
                    createdAt: true,
                    
                }
            }),
            this.prisma.businessTransaction.count({
                where:{businessId: businessId}
            }),
            this.prisma.businessTransaction.findMany({
                where:{businessId: businessId}
            })
        ])

        const totalRevenue = allTransactions.map(prop=>{
            if(prop.flowType === 'revenue'){
                return Number(prop.flowValue/100)
            }
            return 0;
        }).reduce((partialSum, a) => partialSum + a, 0)
        const totalExpense = allTransactions.map(prop=>{
            if(prop.flowType === 'expense'){
                return Number(prop.flowValue/100)
            }
            return 0;
        }).reduce((partialSum, a) => partialSum + a, 0)
        
        return {
            data: transactions,
            total: [
                {
                    name: 'total',
                    revenue: totalRevenue,
                    expense: totalExpense
                }
            ],
            count: transactionsCount,
            currentPage: page,
            nextPage: (page+1)>(transactionsCount/rows)?page:page+1,
            prevPage: (page-1)<0?page:page-1,
            lastPage: Math.ceil(transactionsCount/rows)
        }
    }
}