import { CarPackageMappingDto } from './../dto/carPackageMapping.dto';
import { CarPackageMapping } from '../sales.interface';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('CarPackageMapping')
export class CarPackageMappingEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  CarId: number

  @Column({ type: 'int', nullable: true })
  PackageId: number

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

export function CarPackageMappingDtoToModel(dto: CarPackageMappingDto): CarPackageMappingEntity {
  const model = new CarPackageMappingEntity()
  model.Id = dto.id
  model.CarId = dto.carId
  model.PackageId = dto.packageId
  model.IsActived = dto.isActived
  model.CreatedDate = dto.createdDate
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = dto.updatedDate
  model.UpdatedBy = dto.updatedBy
  return model
}

export function CarPackageMappingModelToDto(model: CarPackageMappingEntity): CarPackageMappingDto {
  const dto: CarPackageMappingDto = {
    id: model.Id,
    carId: model.CarId,
    packageId: model.PackageId,
    isActived: model.IsActived,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}