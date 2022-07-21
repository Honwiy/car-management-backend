import { Injectable } from '@nestjs/common'
import { OrderingEntity, OrderingDtoToModel } from '../entity/ordering.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection, getConnection } from 'typeorm'
import { Customer } from '../../customer/customer.interface'
import { CustomerEntity, customerItemToEntity } from '../../customer/customer.entity'
import dayjs = require('dayjs')
import { CarOrdering } from '../sales.interface'
import { OrderingDto } from '../dto/ordering.dto'
import { CarEntity } from '../../car/entity'

@Injectable()
export class SalesService {
  constructor(
    private readonly connection: Connection
  ) { }

  async saveCustomerForCarOrdering(req: any, orderingBody: CarOrdering): Promise<any> {
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      let orderingResult
      const newCustomer: CustomerEntity = customerItemToEntity(orderingBody.customer)
      const result = await queryRunner.manager.save(newCustomer)
      if (result) {
        let newOrdering: OrderingEntity = OrderingDtoToModel(orderingBody.carOrdering)
        newOrdering.OrderingNumber = dayjs(new Date()).format('YYYYMMDDHHmmss')
        console.log(newOrdering)
        orderingResult = await queryRunner.manager.save(newOrdering)
      }
      await queryRunner.commitTransaction()
      return orderingResult
    } catch (err) {
      await queryRunner.rollbackTransaction()
      console.log(err)
    } finally {
      await queryRunner.release()
    }
  }

  async saveCarOrdering(req: any, ordering: OrderingDto): Promise<any> {
    let result
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()
    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()
      const orderingModel = await connection.getRepository(OrderingEntity).createQueryBuilder('ordering')
        .where('ordering.OrderingNumber = :orderingNumber', { orderingNumber: ordering.orderingNumber })
        .getOne()
      const carModel = OrderingDtoToModel(ordering)
      orderingModel.CarId = carModel.CarId
      orderingModel.OrderPrice = carModel.OrderPrice
      orderingModel.SalesType = carModel.SalesType
      orderingModel.PaymentType = carModel.PaymentType
      orderingModel.UpdatedBy = carModel.UpdatedBy
      orderingModel.UpdatedDate = carModel.UpdatedDate
      await queryRunner.manager.update(OrderingEntity, { OrderingNumber: ordering.orderingNumber }, orderingModel)
      await queryRunner.manager.update(CarEntity, { Id: carModel.CarId }, {StandardSellPrice: carModel.CarPrice})
      result = {isSuccess: true, orderingNumber: orderingModel.OrderingNumber}
      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
      result = {isSuccess: false}
    } finally {
      await queryRunner.release()
      return result
    }
  }
}
