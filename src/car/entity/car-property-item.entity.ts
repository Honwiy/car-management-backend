import { CarPropertyItemDto } from './../dto/car-property-item.dto';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { CarPropertyEntity } from '.'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('CarPropertyItem')
export class CarPropertyItemEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  PropertyId: number

  @Column({ type: 'varchar', length: 255, nullable: true  })
  PropertyItemCode: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PropertyItemText: string

  @Column({type: 'tinyint', nullable: true, default: 1})
  isActive: number

  @Column({ type: 'int', nullable: true })
  ParentId: number

  @Column({ type: 'bigint', nullable: true })
  CreatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedBy: string

  @Column({ type: 'bigint', nullable: true })
  UpdatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedBy: string

  @ManyToOne(type => CarPropertyEntity, carProperty => carProperty.CarPropertyItems)
  carProperty: CarPropertyEntity
}

export function CarPropertyItemDtoToModel(dto: CarPropertyItemDto): CarPropertyItemEntity {
  const model = new CarPropertyItemEntity()
  model.Id = dto.id
  model.PropertyId = dto.propertyId
  model.PropertyItemCode = dto.propertyItemCode
  model.PropertyItemText = dto.propertyItemText
  model.isActive = dto.isActive
  model.ParentId = dto.parentId
  model.CreatedDate = convertDateToTimestampNum(dto.createdDate)
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = convertDateToTimestampNum(dto.updatedDate)
  model.UpdatedBy = dto.updatedBy
  return model
}

export function CarPropertyItemModelToDto(model: CarPropertyItemEntity): CarPropertyItemDto {
  const dto: CarPropertyItemDto = {
    id: model.Id,
    propertyId: model.PropertyId,
    propertyItemCode: model.PropertyItemCode,
    propertyItemText: model.PropertyItemText,
    isActive: model.isActive,
    parentId: model.ParentId,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}
