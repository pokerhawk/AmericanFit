import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { BusinessService } from './Business/business.service';
import { BusinessController } from './Business/business.controller';
import { UserService } from './User/user.service';
import { UserController } from './User/user.controller';
import { SalesService } from './Sales/sales.service';
import { SalesController } from './Sales/sales.controller';
// import { TestGateway } from './gateway/test.gateway';

@Module({
  imports: [ClientModule],
  controllers: [BusinessController, UserController, SalesController],
  providers: [BusinessService, UserService, SalesService], //TestGateway
  exports: [BusinessService, UserService, SalesService]
})
export class AllModule {}
