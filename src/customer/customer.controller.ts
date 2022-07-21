import { Controller, Get, Post, Res, Param, Req, Body } from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { CustomerService } from './customer.service'
import { Customer, SearchFilter } from './customer.interface'
import { success, fail } from '../common/utils/http_result'


@ApiBearerAuth()
@ApiUseTags('customer')
@Controller('customer')
export class CustomerController {

  constructor(
    private customerService: CustomerService
  ) {}

  @Post('findList')
  async getAllCustomer(@Body('filter') filter: SearchFilter): Promise<Array<Customer>> {
    return await this.customerService.findList(filter)
  }

  @Post('saveCustomer')
  async saveCustomer(@Body('customer') customer: Customer): Promise<any> {
    try {
      const result = await this.customerService.save(customer)
      return {result, isSuccess: true}
    } catch (error) {
      return {error, isSuccess: false}
    }
  }
}
