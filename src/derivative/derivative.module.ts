import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DerivativeController } from './derivative.controller'
import { DerivativeService } from './derivative.service'
import { DerivativeCategoryEntity } from './entity/derivative-category.entity'
import { VerifyTokenMiddleware } from '../middlewares/verifyToken.middleware'
import { APP_FILTER } from '@nestjs/core'
import { AllExceptionsFilter } from '../middlewares/httpExceptionFilter.middleware'

@Module({
  imports: [TypeOrmModule.forFeature([DerivativeCategoryEntity])],
  controllers: [DerivativeController],
  providers: [
      DerivativeService
      , {
        provide: APP_FILTER,
        useClass: AllExceptionsFilter,
      }
    ]
})

export class DerivativeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes(
        { path: 'derivative/loadDerivativeList', method: RequestMethod.GET },
        { path: 'derivative/updateDerivativeItem', method: RequestMethod.POST },
        { path: 'derivative/saveOrderingInsuranceInfo', method: RequestMethod.POST }
      )
  }
}
