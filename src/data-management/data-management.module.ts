import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { DataManagementController } from './data-management.controller'
import { DataManagementService } from './data-management.service'
import { CarModule } from '../car/car.module'
import { StoreHouseModule } from '../store-house/store-house.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarPropertyItemMappingEntity } from '../car/entity/car-property-item-mapping.entity'

@Module({
  imports: [
    StoreHouseModule
    , CarModule
    // , TypeOrmModule.forFeature([CarPropertyItemMappingEntity])
  ],
  controllers: [DataManagementController],
  providers: [DataManagementService]
})
export class DataManagementModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        {path: 'data-management/fetchCarSellingPriceMapping', method: RequestMethod.POST}
      )
  }
}

