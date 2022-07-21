import { Controller, Get, Post, Res, Param, Req, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common'
import { Request } from 'express'
import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger'
import {
  FileInterceptor
} from '@nestjs/platform-express'
import { success, fail } from '../common/utils/http_result'
import { CarInfoImportService } from './car-info-import.service'
// import { StoreHouseService } from '../store-house/store-house.service'


@ApiBearerAuth()
@ApiUseTags('car-info-import')
@Controller('car-info-import')
export class CarInfoImportController {

  constructor(
    private carInfoImportService: CarInfoImportService,
    // private storeHouseService: StoreHouseService
  ) { }

  @Post('/:carInfoType')
  @UseInterceptors(FileInterceptor('carInfoImportFile'))
  async importBasicCarPurchaseOrderingInformation(@Req() req: Request, @UploadedFile() file, @Param('carInfoType') carInfoType): Promise<any> {
    let importFileResult
    try {
      importFileResult = await this.carInfoImportService.importCarInfomationFile(req, carInfoType, file)
      return {isSuccess: importFileResult}
    } catch (error) {
      return {error, isSuccess: importFileResult}
    }
  }
}
