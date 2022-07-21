import { CarPropertyItemDto } from './../dto/car-property-item.dto';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm'
import { CarPropertyEntity } from '.'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('CarSellingPriceMapping')
export class CarSellingPriceMappingEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Index('IDX_CarPropertyItemMappingId')
  @Column({ type: 'int', nullable: true })
  CarPropertyItemMappingId: number

  @Column({type: 'decimal', nullable: true})
  CarStandardSellingPrice: number

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
}
