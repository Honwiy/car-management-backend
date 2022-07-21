import { Controller, Post, Get, Req, Body, Request, UseFilters } from '@nestjs/common'

import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger'
import { DerivativeService } from './derivative.service'
import { DerivativeItem } from './dto/derivative-item'
import { AllExceptionsFilter } from '../middlewares/httpExceptionFilter.middleware'


@ApiBearerAuth()
@ApiUseTags('derivative')
@Controller('derivative')
export class DerivativeController {
  constructor(
    private derivativeService: DerivativeService
  ) {}

  @Get('loadDerivativeList')
  async loadDerivativeList(): Promise<any> {
    try {
      const result = await this.derivativeService.loadDerivativeList()
      return {result, isSuccess: true}
    } catch (error) {
      return {error, isSuccess: false}
    }
  }

  @Post('updateDerivativeItem')
  async updateDerivativeItem(@Request() req): Promise<any> {
    try {
      const body = req.body
      const { categoryId, derivativeItem }: {categoryId?: number, derivativeItem: DerivativeItem} = req.body
      const result = await this.derivativeService.updateDerivativeItem(derivativeItem, categoryId)
      return {result, isSuccess: true}
    } catch (error) {
      return {error, isSuccess: false}
    }
  }

  @Post('saveOrderingInsuranceInfo')
  @UseFilters(new AllExceptionsFilter())
  async saveOrderingInsuranceInfo(@Request() req, @Body() insuranceInfo: any ): Promise<any> {
    try {
      const result = await this.derivativeService.saveOrderingInsuranceInfo(req, insuranceInfo)
      return { result, isSuccess: true }
    } catch (error) {
      return {error, isSuccess: false}
    }
  }
}
