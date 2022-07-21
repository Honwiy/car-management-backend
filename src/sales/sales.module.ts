import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { SalesController } from './sales.controller'
import { SalesService } from './service/sales.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerEntity } from '../customer/customer.entity'
import { MongooseModule } from '@nestjs/mongoose'
import { SalesOrderingSchema } from './schema/sales-ordering.schema'
// import { SalesOrderingSchemaService } from './service/sales-ordering-schema.service'


@Module({
  imports: [
      TypeOrmModule.forFeature([CustomerEntity]),
      // MongooseModule.forFeature([{name: 'SalesOrderingSchema', schema: SalesOrderingSchema}])
    ],
  controllers: [SalesController],
  providers: [SalesService
              // , SalesOrderingSchemaService
            ],
  exports: [ SalesService
            // , SalesOrderingSchemaService
          ]
})

export class SalesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        {path: 'sales/saveCustomerForCarOrdering', method: RequestMethod.POST},
        {path: 'sales/saveCarOrdering', method: RequestMethod.POST}
      )
  }
}
