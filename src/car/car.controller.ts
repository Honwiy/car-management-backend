import { Controller, Get, Post, Res, Body, Request, Param } from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { CarService } from './car.service'
import { Car, CarFetchFilter } from './car.interface'


@ApiBearerAuth()
@ApiUseTags('car')
@Controller('car')
export class CarController {

  constructor(
    private carService: CarService
  ) {}

  // @Get('findAll')
  // async getAllCar(): Promise<Car> {
  //   return await this.carService.findAll()
  // }

  @Post('fetchOnSaleCarList')
  async fetchOnSaleCarList(@Body() filter: CarFetchFilter): Promise<any> {
    const result = await this.carService.findSalableCarByFilter(filter)
    return result
  }

  @Get('fetchCarByOrderingNumber/:orderingNumber')
  async fetchCarByOrderingNumber(@Param('orderingNumber') orderingNumber): Promise<any> {
    const result = await this.carService.fetchCarByOrderingNumber(orderingNumber)
    return result
  }
}
