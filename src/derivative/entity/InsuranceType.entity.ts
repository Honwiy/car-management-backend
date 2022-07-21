import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'
import { InsuranceType } from '../dto/insuranceType'

@Entity('InsuranceType')
export class InsuranceTypeEntity {
  @PrimaryGeneratedColumn()
  Id: number

  // @Column({ type: 'int', nullable: true })
  // DerivativeCategoryId: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  InsuranceCode: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  InsuranceText: string

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

export function derivativeItemDtoToModel(dto: InsuranceType): InsuranceTypeEntity {
  const model = new InsuranceTypeEntity()
  model.Id = dto.id
  // model.DerivativeCategoryId = dto.derivativeCategoryId
  model.InsuranceCode = dto.insuranceCode
  model.InsuranceText = dto.insuranceText
  model.IsActived = dto.isActived
  model.CreatedDate = convertDateToTimestampNum(dto.createdDate)
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = convertDateToTimestampNum(dto.updatedDate)
  model.UpdatedBy = dto.updatedBy
  return model
}

export function derivativeItemModelToDTO(model: InsuranceTypeEntity) {
  const dto: InsuranceType = {
    id: model.Id,
    // derivativeCategoryId: model.derivativeCategoryId,
    insuranceCode: model.InsuranceCode,
    insuranceText: model.InsuranceText,
    isActived: model.IsActived,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}
