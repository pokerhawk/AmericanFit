import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { fixedDate, dateProps } from 'src/utils/date/adjust-date';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: ClientService,
    ){}

    async getUsers(rows:number, page:number, businessId:string){
        if(rows === 0 && page === 0 && businessId != ''){
            return await this.prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                where:{businessId: businessId},
                select:{
                    id: true,
                    name: true
                }
            })
        }
        const [users, usersCount] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: rows,
                skip: (page-1)*rows,
                select:{
                    id: true,
                    name: true,
                    email: true,
                    pix: true
                }
            }),
            this.prisma.user.count({})
        ])

        return {
            data: users,
            count: usersCount,
            currentPage: page,
            nextPage: (page+1)>(usersCount/rows)?page:page+1,
            prevPage: (page-1)<0?page:page-1,
            lastPage: Math.ceil(usersCount/rows)
        }
    }

    async sellersList(rows:number, page:number, type:dateProps){
        const [users, usersCount] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                orderBy: {
                    createdAt: 'asc'
                },
                take: rows,
                skip: (page-1)*rows,
                select:{
                    id: true,
                    name: true,
                    email: true,
                    pix: true,
                    userSales:{
                        where:{
                            saleDate: {
                                gte: fixedDate(type, 'gte'),
                                lte: fixedDate(type, 'lte')
                            }
                        },
                        select:{
                            commissionValue: true,
                            quantity: true
                        }
                    },
                    userCommissionWallet:{
                        select: {
                            commissionToBePaid: true
                        }
                    },
                    businessId: true
                }
            }),
            this.prisma.user.count({}),
        ])

        const data = users.map((prop)=>{
            return {
                id: prop.id,
                name: prop.name,
                email: prop.email,
                pix: prop.pix,
                commission: prop.userCommissionWallet.commissionToBePaid,
                quantity: prop.userSales.map(prop=>{return prop.quantity}).reduce((partialSum, a) => partialSum + a, 0),
                businessId: prop.businessId
            }
        })

        return {
            data: data,
            count: usersCount,
            currentPage: page,
            nextPage: (page+1)>(usersCount/rows)?page:page+1,
            prevPage: (page-1)<0?page:page-1,
            lastPage: Math.ceil(usersCount/rows)
        }
    }

    async getUser(id:string){
        const user = await this.prisma.user.findUnique({
            where: {id: id}
        })
        
        return {
            ...user
        };
    }

    async updateUserCommission(id: string, commission: number){
        return await this.prisma.user.update({
            where: {id: id},
            data:{
                commission: commission
            }
        })
    }
}