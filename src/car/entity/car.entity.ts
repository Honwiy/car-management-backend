import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { CarDto } from '../dto/car.dto'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('Car')
export class CarEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  CarPropertyItemMappingId: number

  @Column({ type: 'int', nullable: true })
  StoreHouseId: number

  @Column({ type: 'int', nullable: true })
  OriginStoreHouseId: number

  @Column({type: 'varchar', length: '255', nullable: true})
  CarPurchaseOrderingNumber: string

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  isActive: number

  @Column({ type: 'decimal', nullable: true })
  PurchaseOrderingPrice: number

  @Column({ type: 'decimal', nullable: true })
  StandardSellPrice: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  VinNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  EngineNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  BatteryPackNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  GearboxNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  AnnouncementNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CertificateNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CertificateLocation: string

  @Column({ type: 'bigint', nullable: true })
  ArriveStoreDate: number

  @Column({ type: 'int', nullable: true })
  StoreDateCount: number

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  isThirdParty: number

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  isLocked: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CarStoreHouseStatus: string

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '车辆状态, 0: 在途, 1: 在库' })
  CarStatus: string

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '销售状态, 0: 已销售, 1: 未销售' })
  SellingStatus: string

  @Column({ type: 'bigint', nullable: true })
  ProductionDate: number

  @Column({ type: 'bigint', nullable: true })
  ManufacturedDate: number

  @Column({ type: 'bigint', nullable: true })
  CreatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedBy: string

  @Column({ type: 'bigint', nullable: true })
  UpdatedDate: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedBy: string


  // @ManyToOne(type => CarPurchaseOrderingEntity, CarPurchaseOrdering => CarPurchaseOrdering.Cars)
  // CarPurchaseOrdering: CarPurchaseOrderingEntity

  // @ManyToOne(type => CarPropertyItemMappingEntity, CarPropertyItemMapping => CarPropertyItemMapping.Cars)
  // CarPropertyItemMapping: CarPropertyItemMappingEntity
}

export function carDtoToModel(dto: CarDto): CarEntity {
  const model = new CarEntity()
  model.Id = dto.id
  model.CarPropertyItemMappingId = dto.carPropertyItemMappingId
  model.StoreHouseId = dto.storeHouseId
  model.OriginStoreHouseId = dto.originStoreHouseId
  model.CarPurchaseOrderingNumber = dto.carPurchaseOrderingNumber
  model.isActive = dto.isActive
  model.PurchaseOrderingPrice = dto.purchaseOrderingPrice
  model.StandardSellPrice = dto.standardSellPrice
  model.VinNumber = dto.vinNumber
  model.EngineNumber = dto.engineNumber
  model.BatteryPackNumber = dto.batteryPackNumber
  model.GearboxNumber = dto.gearboxNumber
  model.AnnouncementNumber = dto.announcementNumber
  model.CertificateNumber = dto.certificateNumber
  model.CertificateLocation = dto.certificateLocation
  model.ArriveStoreDate = convertDateToTimestampNum(dto.arriveStoreDate)
  model.StoreDateCount = dto.storeDateCount
  model.isThirdParty = dto.isThirdParty
  model.isLocked = dto.isLocked
  model.CarStoreHouseStatus = dto.carStoreHouseStatus
  model.CarStatus = dto.carStatus
  model.SellingStatus = dto.sellingStatus
  model.ProductionDate = convertDateToTimestampNum(dto.productionDate)
  model.ManufacturedDate = convertDateToTimestampNum(dto.manufacturedDate)
  model.CreatedDate = convertDateToTimestampNum(dto.createdDate)
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = convertDateToTimestampNum(dto.updatedDate)
  model.UpdatedBy = dto.updatedBy
  return model
}

export function carModelToDto(model: CarEntity): CarDto {
  const dto: CarDto = {
    id: model.Id,
    carPropertyItemMappingId: model.CarPropertyItemMappingId,
    storeHouseId: model.StoreHouseId,
    originStoreHouseId: model.OriginStoreHouseId,
    carPurchaseOrderingNumber: model.CarPurchaseOrderingNumber,
    isActive: model.isActive,
    purchaseOrderingPrice: model.PurchaseOrderingPrice,
    standardSellPrice: model.StandardSellPrice,
    vinNumber: model.VinNumber,
    engineNumber: model.EngineNumber,
    batteryPackNumber: model.BatteryPackNumber,
    gearboxNumber: model.GearboxNumber,
    announcementNumber: model.AnnouncementNumber,
    certificateNumber: model.CertificateNumber,
    certificateLocation: model.CertificateLocation,
    arriveStoreDate: convertTimstampNumToDate(model.ArriveStoreDate),
    storeDateCount: model.StoreDateCount,
    isThirdParty: model.isThirdParty,
    isLocked: model.isLocked,
    carStoreHouseStatus: model.CarStoreHouseStatus,
    carStatus: model.CarStatus,
    sellingStatus: model.SellingStatus,
    productionDate: convertTimstampNumToDate(model.ProductionDate),
    manufacturedDate: convertTimstampNumToDate(model.ManufacturedDate),
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}
