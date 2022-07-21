import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { MongooseModule } from '@nestjs/mongoose'
import { Connection } from 'typeorm'
import { CustomerModule } from './customer/customer.module'
import { GeneralOptionModule } from './generaloption/generaloption.module'
import { CarModule } from './car/car.module'
import { PermissionModule } from './permission/permission.module'
import { StoreHouseModule } from './store-house/store-house.module'
import { FinanceModule } from './finance/finance.module'
import { WebsocketModule } from './websocket/websocket.module'
import { DerivativeModule } from './derivative/derivative.module'
import { CarInfoImportModule } from './car-info-import/car-info-import.module'
import { HierarchyModule } from './hierarchy/hierarchy.module'
import { DataManagementModule } from './data-management/data-management.module'
import { SalesModule } from './sales/sales.module'
import { MongoConfig } from './common/mappings/mongo-config'
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // MongooseModule.forRoot(`mongodb+srv://${MongoConfig.USER}:${MongoConfig.PWD}@${MongoConfig.DB_URL}/${MongoConfig.DB_NAME}?retryWrites=true&w=majority`),
    UserModule,
    CustomerModule,
    GeneralOptionModule,
    CarModule,
    PermissionModule,
    StoreHouseModule,
    FinanceModule,
    WebsocketModule,
    DerivativeModule,
    CarInfoImportModule,
    HierarchyModule,
    DataManagementModule,
    SalesModule,
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
