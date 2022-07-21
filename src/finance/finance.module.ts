import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { FinanceController } from './finance.controller'
import { FinanceService } from './finance.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarPurchaseOrderingEntity } from '../store-house/entity/car-purchase-ordering.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CarPurchaseOrderingEntity])],
  controllers: [FinanceController],
  providers: [FinanceService]
})

export class FinanceModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        {path: 'finance/searchApprovalList', method: RequestMethod.POST}
      )
  }
}
