import { StoreHouseDto } from './../dto/storehouse.dto'
import { Entity, Column, PrimaryColumn, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { CarPurchaseOrderingDto } from '../dto/car-purchase-ordering.dto'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'
import { CarEntity } from '../../car/entity'
import { CarPropertyItemMappingEntity, carPropertyItemMappingModelToDto } from '../../car/entity/car-property-item-mapping.entity'

@Entity('StoreHouse')
export class StoreHouseEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  StoreHouseCode: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  StoreHouseName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  StoreHouseLocation: string

  @Column({ type: 'varchar', length: 55, nullable: true })
  StoreHouseTel: string

  @Column({ type: 'tinyint', nullable: true })
  IsActived: number

  @Column({ type: 'bigint', nullable: true })
  CreatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'  })
  CreatedBy: string

  @Column({ type: 'bigint', nullable: true })
  UpdatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'  })
  UpdatedBy: string

}

export function StoreHouseDtoToModel(dto: StoreHouseDto): StoreHouseEntity {
  const model = new StoreHouseEntity()

  model.Id = dto.Id
  model.StoreHouseCode = dto.StoreHouseCode
  model.StoreHouseName = dto.StoreHouseName
  model.StoreHouseLocation = dto.StoreHouseLocation
  model.StoreHouseTel = dto.StoreHouseTel
  model.IsActived = dto.IsActived
  model.CreatedDate = convertDateToTimestampNum(dto.CreatedDate)
  model.CreatedBy = dto.CreatedBy
  model.UpdatedDate = convertDateToTimestampNum(dto.UpdatedDate)
  model.UpdatedBy = dto.UpdatedBy
  return model
}

export function StoreHouseModelToDto(model: StoreHouseEntity): StoreHouseDto {
  const dto: StoreHouseDto = {
    StoreHouseCode: model.StoreHouseCode,
    StoreHouseName: model.StoreHouseName,
    StoreHouseLocation: model.StoreHouseLocation,
    StoreHouseTel: model.StoreHouseTel,
    CreatedDate: convertTimstampNumToDate(model.CreatedDate),
    CreatedBy: model.CreatedBy,
    UpdatedDate: convertTimstampNumToDate(model.UpdatedDate),
    UpdatedBy: model.UpdatedBy,
  }
  return dto
}
