import { PropertyDto } from './../dto/property.dto';
import { Property } from '../sales.interface';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('Property')
export class PropertyEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  CategoryId: number
  
  @Column({ type: 'varchar', length: 255, nullable: true })
  PropertyCode: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  PropertyName: string

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

export function PropertyDtoToModel(dto: PropertyDto): PropertyEntity {
  const model = new PropertyEntity()
  model.Id = dto.id
  model.CategoryId = dto.categoryId
  model.PropertyCode = dto.propertyCode
  model.PropertyName = dto.propertyName
  model.IsActived = dto.isActived
  model.CreatedDate = dto.createdDate
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = dto.updatedDate
  model.UpdatedBy = dto.updatedBy

  return model
}

export function PropertyItemModelToDto(model: PropertyEntity): PropertyDto {
  const dto: PropertyDto = {
    id: model.Id,
    categoryId: model.CategoryId,
    propertyCode: model.PropertyCode,
    propertyName: model.PropertyName,
    isActived: model.IsActived,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}