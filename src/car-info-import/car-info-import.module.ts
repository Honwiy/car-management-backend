import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarInfoImportController } from './car-info-import.controller'
import { CarInfoImportService } from './car-info-import.service'
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware'
import { StoreHouseModule } from '../store-house/store-house.module'
import { StoreHouseService } from '../store-house/store-house.service'
import { CarModule } from '../car/car.module'

@Module({
  // imports: [TypeOrmModule.forFeature([CarPurchaseOrderingEntity])],
  imports: [StoreHouseModule, CarModule],
  controllers: [CarInfoImportController],
  providers: [CarInfoImportService]
})

export class CarInfoImportModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes(
        {path: 'car-info-import/:carInfoType', method: RequestMethod.POST}
      )
  }
}
