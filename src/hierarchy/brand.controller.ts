import { Controller, Get, Post, Res, Param, Req, Body } from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { success, fail } from '../common/utils/http_result'
import { BrandService } from './services/brand.service'
import { Brand } from './interface/brand.interface'


@ApiBearerAuth()
@ApiUseTags('brand')
@Controller('brand')
export class BrandController {

  constructor(
    private brandService: BrandService
  ) {}

  @Post('findList')
  async getAllBrand(@Body('filter') filter: any): Promise<Array<Brand>> {
    return await this.brandService.findList(filter)
  }
}
