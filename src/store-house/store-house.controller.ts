import { Controller, Get, Post, Res, Param, Req, Body, Request } from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger'
import { StoreHouseService } from './store-house.service'
import { CarPurchaseOrderingDto } from './dto/car-purchase-ordering.dto'
import { success, fail } from '../common/utils/http_result'
import { CarPropertyItemList } from '../car/car.interface'
import { CarDto } from '../car/dto/car.dto'


@ApiBearerAuth()
@ApiUseTags('store-house')
@Controller('store-house')
export class StoreHouseController {

  constructor(
    private storeHouseService: StoreHouseService
  ) { }

  @Post('saveCarpurchaseOrdering')
  async saveCarpurchaseOrdering(@Body() carPurchaseOrderingReq: any): Promise<any> {
    try {
      // TODO: split two data model(purchase ordering model, car item mapping model), add insert car table
      const { carPurchaseOrdering, carItemMappingList, car }: { carPurchaseOrdering: CarPurchaseOrderingDto, carItemMappingList: CarPropertyItemList, car: CarDto } = carPurchaseOrderingReq

      const result = await this.storeHouseService.saveCarpurchaseOrdering(carPurchaseOrdering, carItemMappingList, car)
      return { result, isSuccess: true }
    } catch (error) {
      return { error, isSuccess: false }
    }
  }

  @Post('updateCarPurchaseOrdering')
  async updateCarPurchaseOrdering(@Body() carPurchaseOrderingReq: any): Promise<any> {
    try {
      const { carPurchaseOrdering }: { carPurchaseOrdering: CarPurchaseOrderingDto } = carPurchaseOrderingReq
      const result = await this.storeHouseService.updateCarPurchaseOrdering(carPurchaseOrdering)
      return { result, isSuccess: true }
    } catch (error) {
      return { error, isSuccess: false }
    }
  }
}
