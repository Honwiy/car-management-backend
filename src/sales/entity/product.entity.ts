import { ProductDto } from './../dto/product.dto';
import { Product } from './../sales.interface';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('Product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  CategoryId: number

  @Column({ type: 'int', nullable: true })
  StoreHouseId: number

  @Column({ type: 'int', nullable: true })
  BrandId: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  OwnSpecValue: string

  @Column({ type: 'decimal', nullable: true })
  PurchaseOrderingPrice: number

  @Column({ type: 'decimal', nullable: true })
  PrePrice: number

  @Column({ type: 'decimal', nullable: true })
  FinalPrice: number

  @Column({ type: 'tinyint', nullable: true })
  IsDiscount: number

  @Column({ type: 'decimal', nullable: true })
  DiscountPercentage: number

  @Column({ type: 'tinyint', nullable: true })
  IsFree: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  ProductStatus: string

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

export function ProductDtoToModel(dto: ProductDto): ProductEntity {
  const model = new ProductEntity()
  model.Id = dto.id
  model.CategoryId = dto.categoryId
  model.StoreHouseId = dto.storeHouseId
  model.BrandId = dto.brandId
  model.OwnSpecValue = dto.ownSpecValue
  model.PurchaseOrderingPrice = dto.purchaseOrderingPrice
  model.PrePrice = dto.prePrice
  model.FinalPrice = dto.finalPrice
  model.IsDiscount = dto.isDiscount
  model.DiscountPercentage = dto.discountPercentage
  model.IsFree = dto.isFree
  model.ProductStatus = dto.productStatus
  model.IsActived = dto.isActived
  model.CreatedDate = dto.createdDate
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = dto.updatedDate
  model.UpdatedBy = dto.updatedBy
  return model
}

export function ProductModelToDto(model: ProductEntity): ProductDto {
  const dto: ProductDto = {
    id: model.Id,
    categoryId: model.CategoryId,
    storeHouseId: model.StoreHouseId,
    brandId: model.BrandId,
    ownSpecValue: model.OwnSpecValue,
    purchaseOrderingPrice: model.PurchaseOrderingPrice,
    prePrice: model.PrePrice,
    finalPrice: model.FinalPrice,
    isDiscount: model.IsDiscount,
    discountPercentage: model.DiscountPercentage,
    isFree: model.IsFree,
    productStatus: model.ProductStatus,
    isActived: model.IsActived,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}