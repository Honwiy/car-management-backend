import { CarPropertyDto } from './../dto/car-property.dto';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { CarPropertyItemEntity } from '.'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('CarProperty')
export class CarPropertyEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'varchar', length: 255, nullable: true  })
  PropertyCode: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PropertyText: string

  @Column({type: 'tinyint', nullable: true, default: 1})
  isActive: number

  @Column({ type: 'bigint', nullable: true })
  CreatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedBy: string

  @Column({ type: 'bigint', nullable: true })
  UpdatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedBy: string


  @OneToMany(type => CarPropertyItemEntity, carPropertyItem => carPropertyItem.carProperty)
  CarPropertyItems: CarPropertyItemEntity[]
}

export function CarPropertyDtoToModel(dto: CarPropertyDto): CarPropertyEntity {
  const model = new CarPropertyEntity()
  model.Id = dto.id
  model.PropertyCode = dto.propertyCode
  model.PropertyText = dto.propertyText
  model.isActive = dto.isActive
  model.CreatedDate = convertDateToTimestampNum(dto.createdDate)
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = convertDateToTimestampNum(dto.updatedDate)
  model.UpdatedBy = dto.updatedBy
  return model
}

export function CarPropertyModelToDto(model: CarPropertyEntity): CarPropertyDto {
  const dto: CarPropertyDto = {
    id: model.Id,
    propertyCode: model.PropertyCode,
    propertyText: model.PropertyText,
    isActive: model.isActive,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}

