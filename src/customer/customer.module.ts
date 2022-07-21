import { Module, NestModule, MiddlewareConsumer, RequestMethod, Post } from '@nestjs/common'
import { CustomerController } from './customer.controller'
import { CustomerService } from './customer.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerEntity } from './customer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService]
})

export class CustomerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        {path: 'customer/findList', method: RequestMethod.POST},
        {path: 'customer/saveCustomer', method: RequestMethod.POST}
      )
  }
}
