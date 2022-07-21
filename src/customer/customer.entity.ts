import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
import { Customer } from './customer.interface'

@Entity('Customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  BrandId: number

  @Index('IDX_SalesEmployeeId')
  @Column({ type: 'int', nullable: true, comment: '销售人员id' })
  SalesEmployeeId: number

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  Name: string

  @Column({ type: 'text', nullable: true })
  CustomerNumber: string

  @Column({ type: 'text', nullable: true })
  CustomerPhoneNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  IdentityCard: string

  @Column({ type: 'int', nullable: true })
  DistrictId: number

  @Column({ type: 'int', nullable: true })
  CustomerSourceId: number
}

export function customerItemToEntity(dto: Customer): CustomerEntity {
  const model = new CustomerEntity()
  model.Id = dto.Id
  model.BrandId = dto.BrandId
  model.CustomerNumber = dto.CustomerNumber
  model.CustomerPhoneNumber = dto.CustomerPhoneNumber
  model.CustomerSourceId = dto.CustomerSourceId
  model.DistrictId = dto.DistrictId
  model.IdentityCard = dto.IdentityCard
  model.Name = dto.Name
  model.SalesEmployeeId = dto.SalesEmployeeId
  return model
}
