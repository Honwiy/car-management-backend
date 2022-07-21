import { PropertyItemMappingDto } from './../dto/propertyItemMapping.dto';
import { PropertyItemMapping } from '../sales.interface';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('PropertyItemMapping')
export class PropertyItemMappingEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  PropertyItemId: number
  
  @Column({ type: 'int', nullable: true })
  ProductId: number

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

export function PropertyItemMappingDtoToModel(dto: PropertyItemMappingDto): PropertyItemMappingEntity {
  const model = new PropertyItemMappingEntity()
  model.Id = dto.id
  model.PropertyItemId = dto.propertyItemId
  model.ProductId = dto.productId
  model.IsActived = dto.isActived
  model.CreatedDate = dto.createdDate
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = dto.updatedDate
  model.UpdatedBy = dto.updatedBy
  return model
}

export function PropertyItemMappingModelToDto(model: PropertyItemMappingEntity): PropertyItemMappingDto {
  const dto: PropertyItemMappingDto = {
    id: model.Id,
    propertyItemId: model.PropertyItemId,
    productId: model.ProductId,
    isActived: model.IsActived,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}