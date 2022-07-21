import { Controller, Post, Body } from '@nestjs/common'
import { FinanceService } from './finance.service'
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger'
import { CarPurchaseOrderingDto } from '../store-house/dto/car-purchase-ordering.dto'


@ApiBearerAuth()
@ApiUseTags('finance')
@Controller('finance')
export class FinanceController {
  constructor(
    private financeService: FinanceService
  ) {}

  @Post('searchApprovalList')
  async searchApprovalList(@Body('searchList') searchList: CarPurchaseOrderingDto): Promise<any> {
    try {
      const result = await this.financeService.searchApprovalList(searchList)
      return {result, isSuccess: true}
    } catch (error) {
      return {error, isSuccess: false}
    }
  }
}
