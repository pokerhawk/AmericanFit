import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateSalesDto } from './dto/create-sales.dto';
import { UpdateSaleDto } from './dto/update-sale-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
    constructor(
        private readonly salesService: SalesService
    ){}

    @Post('create')
    create(@Body() salePayload: CreateSalesDto){
        return this.salesService.create(salePayload);
    }

    @Get('get')
    userSales(
        @Query('rows', ParseIntPipe) rows: number,
        @Query('page', ParseIntPipe) page: number,
        @Query('id') id: string
    ){
        return this.salesService.userSales(rows, page, id);
    }

    @Get('getAllSalesById')
    getAllSalesById(
        @Query('id') id: string
    ){
        return this.salesService.getAllSalesById(id);
    }

    @Get('pending')
    pendingSales(
        @Query('rows') rows: number,
        @Query('page') page: number,
        @Query('businessId') businessId: string
    ){
        return this.salesService.pendingSales(rows, page, businessId);
    }

    @Post('updateStatus')
    updateSaleStatus(@Body() updateStatusPayload: UpdateSaleDto){
        return this.salesService.updateSaleStatus(updateStatusPayload);
    }
}