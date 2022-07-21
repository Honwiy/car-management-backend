import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { DerivativeItemEntity, derivativeItemModelToDTO } from './derivative-item.entity'
import { DerivativeList } from '../dto/derivative-list'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('DerivativeCategory')
export class DerivativeCategoryEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'text', nullable: true })
  CategoryCode: string

  @Column({ type: 'text', nullable: true, charset: 'utf8mb4' })
  CategoryText: string

  @Column({ type: 'tinyint', nullable: true })
  Status: number

  @Column({ type: 'bigint', nullable: true })
  CreatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedBy: string

  @Column({ type: 'bigint', nullable: true })
  UpdatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedBy: string

  @OneToMany(type => DerivativeItemEntity, derivativeItem => derivativeItem.derivativeCategory)
  DerivativeItems: DerivativeItemEntity[]
}

export function derivativeDerivativeListDtoToModel(dto: DerivativeList): DerivativeCategoryEntity {
  const model = new DerivativeCategoryEntity()
  model.Id = dto.id
  model.CategoryCode = dto.categoryCode
  model.CategoryText = dto.categoryText
  model.Status = dto.status
  model.CreatedDate = convertDateToTimestampNum(dto.createdDate)
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = convertDateToTimestampNum(dto.updatedDate)
  model.UpdatedBy = dto.updatedBy
  return model
}

export function derivativeDerivativeListModelToDTO(model: DerivativeCategoryEntity): DerivativeList {
  const dto: DerivativeList = {
    id: model.Id,
    categoryCode: model.CategoryCode,
    categoryText: model.CategoryText,
    derivativeItemList: model.DerivativeItems.map(item => derivativeItemModelToDTO(item)),
    status: model.Status,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}
