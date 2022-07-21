import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { StoreHouseController } from './store-house.controller'
import { StoreHouseService } from './store-house.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarPurchaseOrderingEntity } from './entity/car-purchase-ordering.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CarPurchaseOrderingEntity])],
  controllers: [StoreHouseController],
  providers: [StoreHouseService],
  exports: [StoreHouseService]
})

export class StoreHouseModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        {path: 'store-house/saveCarpurchaseOrdering', method: RequestMethod.POST},
        {path: 'store-house/updateCarPurchaseOrdering', method: RequestMethod.POST}
      )
  }
}
