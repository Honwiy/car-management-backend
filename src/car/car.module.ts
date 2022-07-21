import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { CarController } from './car.controller'
import { CarService } from './car.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarEntity } from './entity/car.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity])],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService]
})

export class CarModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'car/findAll', method: RequestMethod.GET },
        { path: 'car/saveCar', method: RequestMethod.POST },
        { path: 'car/fetchOnSaleCarList', method: RequestMethod.POST },
        { path: 'car/fetchCarByOrderingNumber/:orderingNumber', method: RequestMethod.GET }
      )
  }
}
