import { Entity, Column, PrimaryColumn, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { CarPurchaseOrderingDto } from '../dto/car-purchase-ordering.dto'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'
import { CarEntity } from '../../car/entity'
import { CarPropertyItemMappingEntity, carPropertyItemMappingModelToDto } from '../../car/entity/car-property-item-mapping.entity'

@Entity('CarPurchaseOrdering')
export class CarPurchaseOrderingEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({type: 'bigint'})
  CarPropertyItemMappingId: number

  @Column({ type: 'varchar', length: 55, charset: 'utf8mb4' })
  PurchaseOrderingNumber: string

  @Column({type: 'bigint'})
  PurchaseOrderingCode: string

  @Column({ type: 'varchar', length: 255, nullable: true})
  PurchaseOrderingTotalPrice: string

  @Column({ type: 'varchar', length: 55, nullable: true, charset: 'utf8mb4' })
  PaymentType: string

  @Column({ type: 'varchar', length: 55, nullable: true, charset: 'utf8mb4' })
  BillingNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4' })
  CooperationBank: string

  @Column({ type: 'varchar', length: 55, nullable: true })
  BillingPrice: string

  @Column({ type: 'bigint', nullable: true })
  BillingStartDate: number

  @Column({ type: 'bigint', nullable: true })
  BillingEndDate: number

  @Column({ type: 'varchar', length: 55, nullable: true })
  PurchaseOrderingStatus: string

  @Column({ type: 'int', nullable: true })
  PurchaseOrderingCount: number

  @Column({ type: 'bigint', nullable: true })
  PurchaseOrderingDate: number

  @Column({ type: 'bigint', nullable: true })
  PurchaseOrderingPlanningDate: number

  @Column({ type: 'bigint', nullable: true })
  CreatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'  })
  CreatedBy: string

  @Column({ type: 'bigint', nullable: true })
  UpdatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'  })
  UpdatedBy: string

  // @OneToMany(type => CarEntity, Car => Car.CarPurchaseOrdering)
  // Cars: CarEntity[]

  // @OneToOne(type => CarPropertyItemMappingEntity)
  // @JoinColumn()
  // CarPropertyItemMapping: CarPropertyItemMappingEntity

}

export function carPurchaseOrderingDtoToModel(dto: CarPurchaseOrderingDto): CarPurchaseOrderingEntity {
  const model = new CarPurchaseOrderingEntity()
  if (dto.billingEndDate) {
    model.BillingEndDate = convertDateToTimestampNum(dto.billingEndDate)
  }
  if (dto.billingStartDate) {
    model.BillingStartDate = convertDateToTimestampNum(dto.billingStartDate)
  }
  model.CarPropertyItemMappingId = dto.carPropertyItemMappingId
  model.PurchaseOrderingNumber = dto.purchaseOrderingNumber
  model.BillingNumber = dto.billingNumber
  model.BillingPrice = dto.billingPrice
  model.CooperationBank = dto.cooperationBank
  model.PurchaseOrderingCode = dto.purchaseOrderingCode
  model.PaymentType = dto.paymentType
  model.PurchaseOrderingPlanningDate = convertDateToTimestampNum(dto.purchaseOrderingPlanningDate)
  model.PurchaseOrderingCount = dto.purchaseOrderingCount
  model.PurchaseOrderingDate = convertDateToTimestampNum(dto.purchaseOrderingDate)
  // model.StartPrice = dto.startPrice
  model.PurchaseOrderingTotalPrice = dto.purchaseOrderingTotalPrice
  model.PurchaseOrderingStatus = dto.purchaseOrderingStatus
  model.CreatedDate = convertDateToTimestampNum(dto.createdDate)
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = convertDateToTimestampNum(dto.updatedDate)
  model.UpdatedBy = dto.updatedBy
  return model
}

export function CarPurchaseOrderingModelToDTO(model: CarPurchaseOrderingEntity): CarPurchaseOrderingDto {
  const dto: CarPurchaseOrderingDto = {
    carPropertyItemMappingId: model.CarPropertyItemMappingId,
    purchaseOrderingCode: model.PurchaseOrderingCode,
    purchaseOrderingNumber: model.PurchaseOrderingNumber,
    purchaseOrderingDate: convertTimstampNumToDate(model.PurchaseOrderingDate),
    billingNumber: model.BillingNumber,
    billingPrice: model.BillingPrice,
    cooperationBank: model.CooperationBank,
    paymentType: model.PaymentType,
    purchaseOrderingPlanningDate: convertTimstampNumToDate(model.PurchaseOrderingPlanningDate),
    purchaseOrderingCount: model.PurchaseOrderingCount,
    // startPrice: model.StartPrice,
    purchaseOrderingTotalPrice: model.PurchaseOrderingTotalPrice,
    billingStartDate: convertTimstampNumToDate(model.BillingStartDate),
    billingEndDate: convertTimstampNumToDate(model.BillingEndDate),
    purchaseOrderingStatus: model.PurchaseOrderingStatus,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy,
    // carPropertyItemMapping: carPropertyItemMappingModelToDto(model.CarPropertyItemMapping)
  }
  return dto
}
