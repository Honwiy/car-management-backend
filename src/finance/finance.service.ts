import { Injectable } from '@nestjs/common'
import { Connection, Repository, SelectQueryBuilder } from 'typeorm'
import { CarPurchaseOrderingEntity, CarPurchaseOrderingModelToDTO } from '../store-house/entity/car-purchase-ordering.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { convertDateToTimestampNum } from '../common/utils/date'
import { carPropertyItemMappingModelToDto } from '../car/entity/car-property-item-mapping.entity'

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(CarPurchaseOrderingEntity)
    private readonly carPurchaseOrderingEntity: Repository<CarPurchaseOrderingEntity>
  ) {}

    async searchApprovalList(searchParams: any) {
      try {
        const builder: SelectQueryBuilder<{}> = await this.carPurchaseOrderingEntity.createQueryBuilder('carPurchaseOrdering')
                                              .leftJoinAndSelect('carPurchaseOrdering.CarPropertyItemMapping', 'carPropertyItemMapping')
      builder.where('1=1')
      builderWhereClause(builder, searchParams)
      console.log(builder.getSql())
      const data = await builder.getMany() as Array<CarPurchaseOrderingEntity>
      return data.map(d => CarPurchaseOrderingModelToDTO(d))
      // return data.map(d => modelToDTO(d))
      } catch (error) {
        console.log(error)
        return {error, isSuccess: false}
      }
  }
}

function builderWhereClause(builder, searchParams: any) {
  Object.keys(searchParams)
    .filter(key => searchParams[key] !== undefined)
    .map(key => {
      if (key === 'brand') {
        builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.brand') = :brand`, { brand: searchParams.brand })
        return
      }
      if (key === 'startTime') {
        builder.andWhere(`carPurchaseOrdering.CreatedDate > :startTime`, { startTime: convertDateToTimestampNum(searchParams.startTime) })
        return
      }
      if (key === 'endTime') {
        builder.andWhere(`carPurchaseOrdering.CreatedDate < :endTime`, { endTime: convertDateToTimestampNum(searchParams.endTime) })
        return
      }
    })
  // builder.andWhere(`carPurchaseOrdering.PurchaseOrderingStatus = :status`, {status: '申请中'})
}
