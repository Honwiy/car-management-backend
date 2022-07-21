import { PropertyItemDto } from './../dto/propertyItem.dto';
import { PropertyItem } from '../sales.interface';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('PropertyItem')
export class PropertyItemEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  PropertyId: number
  
  @Column({ type: 'varchar', length: 255, nullable: true })
  PropertyItemCode: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  PropertyItemName: string

  @Column({ type: 'int', nullable: true })
  ParentId: number

  @Column({ type: 'tinyint', nullable: true })
  IsActived: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedDate: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedBy: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedDate: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedBy: string
}

export function PropertyItemDtoToModel(dto: PropertyItemDto): PropertyItemEntity {
  const model = new PropertyItemEntity()
  model.Id = dto.id
  model.PropertyId = dto.propertyId
  model.PropertyItemCode = dto.propertyItemCode
  model.PropertyItemName = dto.propertyItemName
  model.ParentId = dto.parentId
  model.IsActived = dto.isActived
  model.CreatedDate = dto.createdDate
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = dto.updatedDate
  model.UpdatedBy = dto.updatedBy

  return model
}

export function PropertyItemModelToDto(model: PropertyItemEntity): PropertyItemDto {
  const dto: PropertyItemDto = {
    id: model.Id,
    propertyId: model.PropertyId,
    propertyItemCode: model.PropertyItemCode,
    propertyItemName: model.PropertyItemName,
    parentId: model.ParentId,
    isActived: model.IsActived,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}