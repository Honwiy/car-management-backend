import { StorehouseCarMappingDto } from './../dto/storehouseCarMapping.dto'
import { Entity, Column, PrimaryColumn, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn, Index } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('StorehouseCarMapping')
export class StorehouseCarMappingEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  StoreHouseId: number

  @Column({ type: 'int', nullable: true })
  CarId: number

  @Index('IDX_StoreHouseStatus')
  @Column({ type: 'varchar', length: 55, nullable: true  })
  Status: string

  @Column({ type: 'varchar', length: 55, nullable: true })
  LockTime: string

  @Column({ type: 'varchar', length: 55, nullable: true })
  UnlockTime: string

  @Column({ type: 'bigint', nullable: true })
  CreatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'  })
  CreatedBy: string

  @Column({ type: 'bigint', nullable: true })
  UpdatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'  })
  UpdatedBy: string

}

export function storehouseCarMappingDtoToModel(dto: StorehouseCarMappingDto): StorehouseCarMappingEntity {
  const model = new StorehouseCarMappingEntity()

  model.Id = dto.Id
  model.StoreHouseId = dto.StoreHouseId
  model.CarId = dto.CarId
  model.Status = dto.Status
  model.LockTime = dto.LockTime
  model.UnlockTime = dto.UnlockTime
  model.CreatedDate = convertDateToTimestampNum(dto.CreatedDate)
  model.CreatedBy = dto.CreatedBy
  model.UpdatedDate = convertDateToTimestampNum(dto.UpdatedDate)
  model.UpdatedBy = dto.UpdatedBy
  return model
}

export function storehouseCarMappingModelToDTO(model: StorehouseCarMappingEntity): StorehouseCarMappingDto {
  const dto: StorehouseCarMappingDto = {
    StoreHouseId: model.StoreHouseId,
    CarId: model.CarId,
    Status: model.Status,
    LockTime: model.LockTime,
    UnlockTime: model.UnlockTime,
    CreatedDate: convertTimstampNumToDate(model.CreatedDate),
    CreatedBy: model.CreatedBy,
    UpdatedDate: convertTimstampNumToDate(model.UpdatedDate),
    UpdatedBy: model.UpdatedBy,
  }
  return dto
}
