import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { DerivativeCategoryEntity } from './derivative-category.entity'
import { DerivativeItem } from '../dto/derivative-item'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('DerivativeItem')
export class DerivativeItemEntity {
  @PrimaryGeneratedColumn()
  Id: number

  // @Column({ type: 'int', nullable: true })
  // DerivativeCategoryId: number

  @Column({ type: 'text', nullable: true })
  ItemCode: string

  @Column({ type: 'text', nullable: true, charset: 'utf8mb4' })
  ItemText: string

  @Column({ type: 'text', nullable: true, charset: 'utf8mb4' })
  ItemUnit: string

  @Column({ type: 'decimal', nullable: true })
  ItemPrice: number

  @Column({ type: 'tinyint', nullable: true })
  Status: number

  @Column({ type: 'bigint', nullable: true })
  CreatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4' })
  CreatedBy: string

  @Column({ type: 'bigint', nullable: true })
  UpdatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4' })
  UpdatedBy: string

  @ManyToOne(type => DerivativeCategoryEntity, derivativeCategory => derivativeCategory.DerivativeItems)
  derivativeCategory: DerivativeCategoryEntity
}

export function derivativeItemDtoToModel(dto: DerivativeItem): DerivativeItemEntity {
  const model = new DerivativeItemEntity()
  model.Id = dto.id
  // model.DerivativeCategoryId = dto.derivativeCategoryId
  model.ItemCode = dto.itemCode
  model.ItemText = dto.itemText
  model.ItemUnit = dto.itemUnit
  model.ItemPrice = dto.itemPrice
  model.Status = dto.status
  model.CreatedDate = convertDateToTimestampNum(dto.createdDate)
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = convertDateToTimestampNum(dto.updatedDate)
  model.UpdatedBy = dto.updatedBy
  return model
}

export function derivativeItemModelToDTO(model: DerivativeItemEntity): DerivativeItem {
  const dto: DerivativeItem = {
    id: model.Id,
    // derivativeCategoryId: model.derivativeCategoryId,
    itemCode: model.ItemCode,
    itemText: model.ItemText,
    itemUnit: model.ItemUnit,
    itemPrice: model.ItemPrice,
    status: model.Status,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}
