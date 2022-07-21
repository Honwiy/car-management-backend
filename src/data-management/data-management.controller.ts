import { Controller, Get, Post, Res, Param, Req, Body } from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { success, fail } from '../common/utils/http_result'
import { DataManagementService } from './data-management.service'
import { CarSellingPriceFetchMapping } from './data-management.interface'

@ApiBearerAuth()
@ApiUseTags('data-management')
@Controller('data-management')
export class DataManagementController {

  constructor(
    private dataManagementService: DataManagementService
  ) {}

  @Post('fetchCarSellingPriceMapping')
  async getAllCustomer(@Body() filter: CarSellingPriceFetchMapping) {
    return await this.dataManagementService.findSalableCarByFilter(filter)
  }
}
