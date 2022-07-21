import { Controller, Get, Post, Res, Param, Req, Body, Query } from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { GeneralOptionService } from './generaloption.service'
import { GeneralOption } from './generaloption.interface'
import { success, fail } from '../common/utils/http_result'
import { GeneralOptionEntity } from './generaloption.entity'


@ApiBearerAuth()
@ApiUseTags('generaloption')
@Controller('generaloption')
export class GeneralOptionController {

  constructor(
    private generaloptionService: GeneralOptionService
  ) { }

  @Post('findList')
  async getAllGeneralOption(@Body('filter') filter: any): Promise<Array<GeneralOption>> {
    return await this.generaloptionService.findList(filter)
  }

  @Post('findOneDropdownList')
  async findOneDropdownList(@Body('filter') filter: any): Promise<Array<GeneralOption>> {
    return await this.generaloptionService.findOneDropdownList(filter)
  }

  @Post('createNewGeneralOption')
  async createNewGeneralOption(@Body('generaloption') generaloption: GeneralOption): Promise<any> {
    try {
      const result = await this.generaloptionService.save(generaloption)
      return { result, isSuccess: true }
    } catch (error) {
      return { error, isSuccess: false }
    }
  }

  @Get('getDropDownListByCategory/:category')
  async getDropDownListByCategory(@Param('category') category): Promise<any> {
    try {
      const result = await this.generaloptionService.getDropDownListByCategory(category)
      return { result, isSuccess: true }
    } catch (error) {
      return { error, isSuccess: false }
    }
  }
}
