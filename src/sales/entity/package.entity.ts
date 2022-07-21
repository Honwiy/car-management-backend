import { PackageDto } from './../dto/package.dto';
import { Package } from '../sales.interface';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('Package')
export class PackageEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  PackageName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  PackageCode: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  Type: string

  @Column({ type: 'int', nullable: true })
  ProductId: number

  @Column({ type: 'int', nullable: true })
  Quantity: number

  @Column({ type: 'int', nullable: true })
  PaymentType: number

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

export function PackageDtoToModel(dto: PackageDto): PackageEntity {
  const model = new PackageEntity()
  model.Id = dto.id
  model.PackageName = dto.packageName
  model.PackageCode = dto.packageCode
  model.Type = dto.type
  model.ProductId = dto.productId
  model.Quantity = dto.quantity
  model.PaymentType = dto.paymentType
  model.IsActived = dto.isActived
  model.CreatedDate = dto.createdDate
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = dto.updatedDate
  model.UpdatedBy = dto.updatedBy
  return model
}

export function PropertyItemModelToDto(model: PackageEntity): PackageDto {
  const dto: PackageDto = {
    id: model.Id,
    packageName: model.PackageName,
    packageCode: model.PackageCode,
    type: model.Type,
    productId: model.ProductId,
    quantity: model.Quantity,
    paymentType: model.PaymentType,
    isActived: model.IsActived,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}