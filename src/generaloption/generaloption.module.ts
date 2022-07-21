import { Module, NestModule, MiddlewareConsumer, RequestMethod, Post } from '@nestjs/common'
import { GeneralOptionController } from './generaloption.controller'
import { GeneralOptionService } from './generaloption.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GeneralOptionEntity } from './generaloption.entity'

@Module({
  imports: [TypeOrmModule.forFeature([GeneralOptionEntity])],
  controllers: [GeneralOptionController],
  providers: [GeneralOptionService]
})

export class GeneralOptionModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: 'generaloption/findList', method: RequestMethod.POST },
        { path: 'generalOption/findOneDropdownList', method: RequestMethod.POST },
        { path: 'generaloption/createNewGeneralOption', method: RequestMethod.POST },
        { path: 'generaloption/getDropDownListByCategory/:category', method: RequestMethod.GET }
      )
  }
}
