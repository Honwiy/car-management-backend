import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { CarEntity } from './car.entity'
import { CarPropertyItemEntity } from '.'
import { CarPropertyItemMappingDto } from '../dto/car-property-item-mapping.dto'
import { CarPurchaseOrderingEntity } from '../../store-house/entity/car-purchase-ordering.entity'

@Entity('CarPropertyItemMapping')
export class CarPropertyItemMappingEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'text', nullable: true })
  CarPropertyItemList: string

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  isActive: number

  // @OneToMany(type => CarEntity, Car => Car.CarPropertyItemMapping)
  // Cars: CarEntity[]
}

export function carPropertyItemMappingDtoToModel(dto: CarPropertyItemMappingDto): CarPropertyItemMappingEntity {
  const model = new CarPropertyItemMappingEntity()
  model.CarPropertyItemList = JSON.stringify(dto.carPropertyItemList)
  model.isActive = dto.isActive
  return model
}

export function carPropertyItemMappingModelToDto(model: CarPropertyItemMappingEntity): CarPropertyItemMappingDto {
  const dto: CarPropertyItemMappingDto = {
    carPropertyItemList: JSON.parse(model.CarPropertyItemList),
    isActive: model.isActive
  }
  return dto
}
