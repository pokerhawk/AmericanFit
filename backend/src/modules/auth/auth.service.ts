import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto, CreateBusinessDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { businessToReturnMapper, userToReturnMapper } from 'src/utils/mappers/user-to-return.mapper';

interface ILoginBody {
    email: string;
    password: string;
}

type PayloadProps = {
    sub: string;
    email: string;
    name?: string;
    company?: string;
}

type LoginInfoProps = {
    id: string;
    type: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: ClientService,
        private readonly jwtService: JwtService
    ){}

    validateApiKey(apiKey: string){
        const apiKeys: string[] = [process.env.API_KEY];
        return apiKeys.find(key => key == apiKey)
    }

    async validateBusiness(email: string, password: string){
        const business = await this.prisma.business.findUnique({where: {email: email}})
        if(business && await bcrypt.compare(password, business.password)){
            return businessToReturnMapper(business)
        }
    }
    async validateUser(email: string, password: string){
        const user = await this.prisma.user.findUnique({where: {email: email}})
        if (user && await bcrypt.compare(password, user.password)) {
            return userToReturnMapper(user);
        }
    }

    async login(body:ILoginBody){
        const user = await this.validateUser(body.email, body.password);
        const business = await this.validateBusiness(body.email, body.password);
        let payload:PayloadProps;
        let loginInfo:LoginInfoProps;
        
        if(business){
            payload = {
                sub: business.id,
                email: business.email,
                company: business.company
            };
            loginInfo = {
                id: business.id,
                type: 'business'
            }
        }
        if(user){
            payload = {
                sub: user.id,
                email: user.email,
                name: user.name,
            };
            loginInfo = {
                id: user.id,
                type: 'user'
            }
        }

        return {
            id: loginInfo.id,
            type: loginInfo.type,
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '60d' }),
            message: `Bem vindo ${payload.name}`
        }
    }

    async registerUser(userPayload: CreateUserDto){
        const user = {
            ...userPayload,
            password: bcrypt.hashSync(userPayload.password, 10)
        };

        const checkEmail = await this.prisma.user.findFirst({
            where:{email: user.email}
        })

        if(checkEmail != null){
            throw new BadRequestException("Este email já existe")
        }

        const userInfo = await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                pix: user.pix,
                businessId: user.businessId
            }
        })
        await this.prisma.userCommissionWallet.create({
            data: {
                userId: userInfo.id,
                commissionToBePaid: 0
            }
        })
        return 'Cadastrado com sucesso!'
    }

    async registerBusiness(businessPayload: CreateBusinessDto){
        
        const business = {
            ...businessPayload,
            password: bcrypt.hashSync(businessPayload.password, 10)
        };

        const checkEmail = await this.prisma.business.findFirst({
            where:{email: business.email}
        })

        if(checkEmail != null){
            throw new BadRequestException("Este email já existe")
        }

        const businessInfo = await this.prisma.business.create({
            data: {
                company: business.name,
                email: business.email,
                password: business.password
            }
        })

        await this.prisma.businessWallet.create({
            data: {
                balance: 0,
                expense: 0,
                revenue: 0,
                businessId: businessInfo.id
            }
        })

        return 'Cadastrado com sucesso!'
    }
}