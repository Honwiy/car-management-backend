import { Controller, Get, Post, Res, Param, Req, Body } from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { success, fail } from '../common/utils/http_result'
import { SalesService } from './service/sales.service'
import { Request } from 'express'
import { CarOrdering } from './sales.interface'
import { OrderingDto } from './dto/ordering.dto'


@ApiBearerAuth()
@ApiUseTags('sales')
@Controller('sales')
export class SalesController {

  constructor(
    private salesService: SalesService
  ) {}

  @Post('saveCustomerForCarOrdering')
  async saveCustomerForCarOrdering(@Req() req: Request, @Body() body: CarOrdering): Promise<any> {
    try {
      const result = await this.salesService.saveCustomerForCarOrdering(req, body)
      return {result, isSuccess: true}
    } catch (error) {
      return {error, isSuccess: false}
    }
  }

  @Post('saveCarOrdering')
  async saveCarOrdering(@Req() req: Request, @Body() carOrdering: OrderingDto): Promise<any> {
    let result
    try {
      result = await this.salesService.saveCarOrdering(req, carOrdering)
    } catch (error) {
      console.log(error)
      result = {isSuccess: false}
    } finally {
      return result
    }
  }

}
