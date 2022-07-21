import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'
import { InsuranceOrderingMapping } from '../dto/insuranceOrderingMapping'

@Entity('InsuranceOrderingMapping')
export class InsuranceOrderingMappingEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Index('IDX_InsuranceTypeId')
  @Column({ type: 'int', nullable: true })
  InsuranceTypeId: number

  @Index('IDX_OrderingNumber')
  @Column({ type: 'bigint', nullable: true })
  OrderingNumber: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  InsuranceValue: string

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  IsActived: number

  @Column({ type: 'bigint', nullable: true })
  CreatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4' })
  CreatedBy: string

  @Column({ type: 'bigint', nullable: true })
  UpdatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4' })
  UpdatedBy: string
}

export function insuranceOrderingMappingDtoToModel(dto: InsuranceOrderingMapping): InsuranceOrderingMappingEntity {
  const model = new InsuranceOrderingMappingEntity()
  model.Id = dto.id
  // model.DerivativeCategoryId = dto.derivativeCategoryId
  model.InsuranceTypeId = dto.insuranceTypeId
  model.OrderingNumber = dto.orderingNumber
  model.InsuranceValue = dto.insuranceValue
  model.IsActived = dto.isActived
  model.CreatedDate = convertDateToTimestampNum(dto.createdDate)
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = convertDateToTimestampNum(dto.updatedDate)
  model.UpdatedBy = dto.updatedBy
  return model
}

export function insuranceOrderingMappingModelToDTO(model: InsuranceOrderingMappingEntity) {
  const dto: InsuranceOrderingMapping = {
    id: model.Id,
    // derivativeCategoryId: model.derivativeCategoryId,
    insuranceTypeId: model.InsuranceTypeId,
    orderingNumber: model.OrderingNumber,
    insuranceValue: model.InsuranceValue,
    isActived: model.IsActived,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}
