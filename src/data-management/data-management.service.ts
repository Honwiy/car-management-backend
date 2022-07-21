import { Injectable } from '@nestjs/common'
import { CarSellingPriceFetchMapping } from './data-management.interface'
import { SelectQueryBuilder, Repository, Connection, getRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CarPropertyItemMappingEntity } from '../car/entity/car-property-item-mapping.entity'
import { CarSellingPriceMappingEntity } from '../car/entity/car-selling-price-mapping.entity'

// @Injectable()
export class DataManagementService {
  constructor(
    // @InjectRepository()
    private readonly carPropertyItemMappingEntity: Repository<CarPropertyItemMappingEntity>,
    private readonly connection: Connection
  ) { }
  async findSalableCarByFilter(fetchMapping: CarSellingPriceFetchMapping) {
    console.log(fetchMapping)
    try {
      const builder: SelectQueryBuilder<{}> = await getRepository(CarPropertyItemMappingEntity).createQueryBuilder('carPropertyItemMapping')
        .leftJoinAndSelect(CarSellingPriceMappingEntity, 'carSellingPriceMapping', 'carPropertyItemMapping.Id = carSellingPriceMapping.CarPropertyItemMappingId')
        .select('carPropertyItemMapping.CarPropertyItemList', 'CarPropertyItemList')
        .addSelect('carSellingPriceMapping.Id', 'Id')
        .addSelect('carSellingPriceMapping.CarPropertyItemMappingId', 'CarPropertyItemMappingId')
        .addSelect('carSellingPriceMapping.CarStandardSellingPrice', 'CarStandardSellingPrice')
        .addSelect('carSellingPriceMapping.isActive', 'isActive')
        .addSelect('carSellingPriceMapping.CreatedDate', 'CreatedDate')
        .addSelect('carSellingPriceMapping.CreatedBy', 'CreatedBy')
        .addSelect('carSellingPriceMapping.UpdatedDate', 'UpdatedDate')
        .addSelect('carSellingPriceMapping.UpdatedBy', 'UpdatedBy')
      builder.andWhere('1=1')
      Object.keys(fetchMapping)
        .filter(key => fetchMapping[key] !== undefined)
        .map(key => {
          if (key === 'carBrand') {
            builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.brand') = :brand`, { brand: fetchMapping.carBrand })
            return
          }
          if (key === 'carType') {
            builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.carType') = :carType`, { carType: fetchMapping.carType })
            return
          }
          if (key === 'carSeries') {
            builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.carSeries') = :carSeries`, { carSeries: fetchMapping.carSeries })
            return
          }
        })
      const data = await builder.getRawMany()
      if (data.length > 0) {
        data.forEach(item => {
          if (item.CarPropertyItemList) {
            item.CarPropertyItemList = JSON.parse(item.CarPropertyItemList)
          }
        })
      }
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
}
