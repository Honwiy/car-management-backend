import { Injectable } from '@nestjs/common'
import { CustomerEntity, customerItemToEntity } from './customer.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like, getConnection } from 'typeorm'
import { Customer, SearchFilter } from './customer.interface'
import { OrderingEntity } from '../sales/entity/ordering.entity'
import * as dayjs from 'dayjs'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>
  ) { }

  async findList(filter: SearchFilter): Promise<Array<Customer>> {
    let whereObj: any = {}
    let { Name, CustomerPhoneNumber, IdentityCard, BrandId } = filter
    if (Name) {
      whereObj.Name = Like(`%${filter.Name}%`)
    }
    if (CustomerPhoneNumber) {
      whereObj.CustomerPhoneNumber = Like(`%${filter.CustomerPhoneNumber}%`)
    }
    if (IdentityCard) {
      whereObj.IdentityCard = Like(`%${filter.IdentityCard}%`)
    }
    if (BrandId) {
      whereObj.BrandId = Like(`%${filter.BrandId}%`)
    }
    const customerList = await this.customerRepository.find({
      where: whereObj
    })
    return customerList
  }

  async save(customer: Customer): Promise<any> {
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const newCustomer: CustomerEntity = customerItemToEntity(customer)
      const result =  await queryRunner.manager.save(newCustomer)
      await queryRunner.commitTransaction()
      return result
    } catch (err) {
      await queryRunner.rollbackTransaction()
      console.log(err)
    } finally {
      await queryRunner.release()
    }
  }
}
