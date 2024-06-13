import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { CreateTransactionDto } from './dto/business.dto';
import { dateProps } from 'src/utils/date/adjust-date';

@UseGuards(JwtAuthGuard)
@Controller('business')
export class BusinessController {
    constructor(
        private readonly businessService: BusinessService
    ){}

    @IsPublic()
    @Get('getAll')
    getAll(){
        return this.businessService.getAll();
    }

    @Post('createTransaction')
    businessCreateTransaction(@Body() body:CreateTransactionDto){
        return this.businessService.businessCreateTransaction(body);
    }

    @Get('wallet')
    getBusinessWallet(
        @Query('id') id:string
    ){
        return this.businessService.getBusinessWallet(id)
    }

    @Get('roi')
    getBusinessROI(
        @Query('id') id:string,
        @Query('type') type:dateProps
    ){
        return this.businessService.getBusinessROI(id, type)
    }

    @Get('getTransactions')
    getTransactions(
        @Query('rows') rows: number,
        @Query('page') page: number,
        @Query('businessId') businessId: string
    ){
        return this.businessService.getTransactions(rows, page, businessId);
    }
}