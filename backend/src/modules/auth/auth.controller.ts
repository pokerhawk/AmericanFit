import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, CreateBusinessDto } from './dto/register.dto';
import { ApiKeyAuthGuard } from './guards/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    login(@Body() body:any){
        return this.authService.login(body);
    }

    @Post('registerUser')
    registerUser(@Body() userPayload:CreateUserDto){
        return this.authService.registerUser(userPayload);
    }

    @Post('registerBusiness')
    registerBusiness(@Body() businessPayload:CreateBusinessDto){
        return this.authService.registerBusiness(businessPayload);
    }
}