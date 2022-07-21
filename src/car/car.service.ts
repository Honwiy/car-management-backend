import { Injectable } from '@nestjs/common'
import { CarEntity, carDtoToModel } from './entity/car.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Connection, SelectQueryBuilder, getConnection, getRepository } from 'typeorm'
import { Car, CarFetchFilter } from './car.interface'
import { CarDto } from './dto/car.dto'
import { StorehouseCarMappingEntity } from '../store-house/entity/storehouseCarMapping.entity'
import { CarPropertyItemMappingEntity } from './entity/car-property-item-mapping.entity'
import { CAR_STOREHOUSE_STATUS_MAPPING } from '../common/mappings/car-status.mapping'
import { CarPurchaseOrderingEntity } from '../store-house/entity/car-purchase-ordering.entity'
import { OrderingEntity, OrderingModelToDto } from '../sales/entity/ordering.entity'

enum CARMANUFACTUREDDATESORT {
  DESC = 0,
  ASC = 1
}

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
    private readonly connection: Connection
  ) {}

  // async findAll(): Promise<Car> {
  //   const car = await this.carRepository.findOne()
  //   return car
  // }

  // async saveCar(car: Car): Promise<Car> {
  //   return await this.carRepository.save(car)
  // }
  async saveOrUpdateCarInfo(carModel: CarEntity) {
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const result: any = await queryRunner.manager.save(carModel)
      await queryRunner.commitTransaction()
      return result
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.log(err)
      await queryRunner.rollbackTransaction()
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release()
    }
  }

  async findSalableCarByFilter(carFilter: CarFetchFilter) {
    try {
      const builder: SelectQueryBuilder<{}> = await this.carRepository.createQueryBuilder('car')
                                                      .leftJoinAndSelect(StorehouseCarMappingEntity, 'storehouseCarMapping', 'storehouseCarMapping.CarId = car.Id')
                                                      .leftJoinAndSelect(CarPropertyItemMappingEntity, 'carPropertyItemMapping', 'carPropertyItemMapping.Id = car.CarPropertyItemMappingId')
                                                      .leftJoinAndSelect(CarPurchaseOrderingEntity, 'carPurchaseOrdering', 'car.CarPurchaseOrderingNumber = carPurchaseOrdering.PurchaseOrderingNumber')
                                                      .select('car.Id', 'CarId')
                                                      .addSelect('car.CarPurchaseOrderingNumber', 'CarPurchaseOrderingNumber')
                                                      .addSelect('car.VinNumber', 'CarVinNumber')
                                                      .addSelect('car.EngineNumber', 'CarEngineNumber')
                                                      .addSelect('car.StandardSellPrice', 'CarStandardSellPrice')
                                                      .addSelect('car.CertificateNumber', 'CertificateNumber')
                                                      .addSelect('carPurchaseOrdering.BillingEndDate', 'BillingEndDate')
                                                      .addSelect('carPropertyItemMapping.CarPropertyItemList', 'CarPropertyItemList')
    builder.andWhere('1=1')
    Object.keys(carFilter)
    .filter(key => carFilter[key] !== undefined)
    .map(key => {
      if (key === 'carBrand') {
        builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.brand') = :brand`, { brand: carFilter.carBrand })
        return
      }
      if (key === 'carType') {
        builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.carType') like :carType`, { carType: `%${carFilter.carType}%` })
        return
      }
      if (key === 'carSeries') {
        builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.carSeries') = :carSeries`, { carSeries: carFilter.carSeries })
        return
      }
    })
    // builder.andWhere('carPurchaseOrdering.BillingEndDate BETWEEN :start AND :end', {start: carFilter.carBillingEndDateFrom, end: carFilter.carBillingEndDateTo})
    builder.andWhere('car.isLocked = 0')
    builder.andWhere('storehouseCarMapping.Status = :status', {status: CAR_STOREHOUSE_STATUS_MAPPING.SALEDABLE_INVENTORY})
    let data = await builder.getRawMany()
    data.forEach(item => {
      item.CarPropertyItemList = JSON.parse(item.CarPropertyItemList)
    })
    let obj = {}
    data = data.reduce(function(item, next) {
      if (!obj[next.CarId]) {
        obj[next.CarId] = true && item.push(next)
      }
      return item
    }, [])
    return data
    } catch (error) {
      console.log(error)
    }
  }

  async fetchCarByOrderingNumber(orderingNumber) {
    const orderingModel = await getRepository(OrderingEntity).createQueryBuilder('ordering')
                          .where(`ordering.OrderingNumber = :orderingNumber`, {orderingNumber})
                          .getOne()
    const orderingObj = OrderingModelToDto(orderingModel)
    return orderingObj
  }
}

