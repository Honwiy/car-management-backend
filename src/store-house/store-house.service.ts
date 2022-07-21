import { Injectable } from '@nestjs/common'
import { CarPurchaseOrderingDto } from './dto/car-purchase-ordering.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like, Connection } from 'typeorm'

import { CarPurchaseOrderingEntity, carPurchaseOrderingDtoToModel } from './entity/car-purchase-ordering.entity'
import { CarPropertyItemMappingEntity, carPropertyItemMappingDtoToModel } from '../car/entity/car-property-item-mapping.entity'
import { CarPropertyItemList } from '../car/car.interface'
import { CarPropertyItemMappingDto } from '../car/dto/car-property-item-mapping.dto'
import { CarEntity } from '../car/entity'
import { carDtoToModel } from '../car/entity/car.entity'
import { CarDto } from '../car/dto/car.dto'
import { StorehouseCarMappingEntity } from './entity/storehouseCarMapping.entity'
import { StorehouseCarMapping } from './store-house.interface'
import { CAR_STATUS_MAPPING, CAR_SELLING_STATUS_MAPPING, CAR_STOREHOUSE_STATUS_MAPPING } from '../common/mappings/car-status.mapping'
import dayjs = require('dayjs')
import { StorehouseCarMappingDto } from './dto/storehouseCarMapping.dto'

@Injectable()
export class StoreHouseService {
  constructor(private readonly connection: Connection) { }

  // init car purchase ordering and save
  async saveCarpurchaseOrdering(carPurchaseOrderingDto: CarPurchaseOrderingDto, carItemMappingList?: CarPropertyItemList, carDto?: CarDto) {
    const carItemMappingDto: CarPropertyItemMappingDto = {
      carPropertyItemList: carItemMappingList
      , isActive: 1
    }
    const carPropertyItemMappingModel: CarPropertyItemMappingEntity = carPropertyItemMappingDtoToModel(carItemMappingDto)
    const carPurchaseOrderingModel: CarPurchaseOrderingEntity = carPurchaseOrderingDtoToModel(carPurchaseOrderingDto)
    const queryRunner = this.connection.createQueryRunner()
    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()
      const existedCarPropertyItemMapping: Array<CarPropertyItemMappingEntity> = await queryRunner.manager.find(CarPropertyItemMappingEntity, carPropertyItemMappingModel)
      let carMappingResult: CarPropertyItemMappingEntity
      let carPurchaseOrderingResult: any
      let existedCarInfoRes: Array<CarEntity> = []
      if (existedCarPropertyItemMapping.length === 0) {
        carMappingResult = await queryRunner.manager.save(carPropertyItemMappingModel)
        carPurchaseOrderingModel.CarPropertyItemMappingId = carMappingResult.Id
      } else {
        carPurchaseOrderingModel.CarPropertyItemMappingId = existedCarPropertyItemMapping[0].Id
      }
      const existedCarPurchaseOrdering: Array<CarPurchaseOrderingEntity> = await queryRunner.manager.find(CarPurchaseOrderingEntity, carPurchaseOrderingModel)
      if (existedCarPurchaseOrdering.length === 0) {
        carPurchaseOrderingResult = await queryRunner.manager.save(carPurchaseOrderingModel)
      } else if (Number(existedCarPurchaseOrdering[0].CarPropertyItemMappingId) === existedCarPropertyItemMapping[0].Id) {
        await queryRunner.manager.update(CarPurchaseOrderingEntity, existedCarPurchaseOrdering[0].Id, { PurchaseOrderingCount: existedCarPurchaseOrdering[0].PurchaseOrderingCount + 1 })
        carPurchaseOrderingResult = await queryRunner.manager.find(CarPurchaseOrderingEntity, { Id: existedCarPurchaseOrdering[0].Id })
        console.log(carPurchaseOrderingResult)
      }
      for (let i = 0; i < carPurchaseOrderingDto.purchaseOrderingCount; i++) {
        const carModel: CarEntity = carDtoToModel(carDto)
        carModel.CarPropertyItemMappingId = carMappingResult ? carMappingResult.Id : existedCarPropertyItemMapping[0].Id
        console.log('carPurchaseOrderingResult ----- ', carPurchaseOrderingResult)
        carModel.CarPurchaseOrderingNumber = typeof carPurchaseOrderingResult === 'object' ? carPurchaseOrderingResult.PurchaseOrderingNumber : carPurchaseOrderingResult[0].PurchaseOrderingNumber
        if (carModel.VinNumber && carModel.EngineNumber) {
          existedCarInfoRes = await queryRunner.manager.find(CarEntity, { VinNumber: carModel.VinNumber, EngineNumber: carModel.EngineNumber })
        }
        if (existedCarInfoRes.length === 0) {
          const res = await queryRunner.manager.save(carModel)
          if (res) {
            let storeHouseCarMapping: StorehouseCarMappingEntity = new StorehouseCarMappingEntity()
            storeHouseCarMapping.StoreHouseId = 1
            storeHouseCarMapping.CarId = res.Id
            storeHouseCarMapping.Status = CAR_STOREHOUSE_STATUS_MAPPING.PURCHASE_ORDERING_INVENTORY
            if (res.CertificateNumber || res.CertificateLocation) {
              storeHouseCarMapping.Status = CAR_STOREHOUSE_STATUS_MAPPING.SALEDABLE_INVENTORY
            }
            storeHouseCarMapping.CreatedDate = res.CreatedDate
            storeHouseCarMapping.CreatedBy = res.CreatedBy
            storeHouseCarMapping.UpdatedDate = res.UpdatedDate
            storeHouseCarMapping.UpdatedBy = res.UpdatedBy
            await queryRunner.manager.save(storeHouseCarMapping)
          }
        }
      }
      await queryRunner.commitTransaction()
      return { isSuccess: true }
    } catch (err) {
      // if we have errors lets rollback the changes we made
      console.log(err)
      await queryRunner.rollbackTransaction()
    } finally {
      // need to release a queryRunner which was manually instantiated
      await queryRunner.release()
    }
  }

  async updateCarPurchaseOrdering(carPurchaseOrderingDto: CarPurchaseOrderingDto) {
    const carPurchaseOrderingModel: CarPurchaseOrderingEntity = carPurchaseOrderingDtoToModel(carPurchaseOrderingDto)
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const result: any = await queryRunner.manager.save(carPurchaseOrderingModel)

      console.log(result)
      const singlePurchaseOrderingPrice = Number(carPurchaseOrderingModel.PurchaseOrderingTotalPrice) / Number(carPurchaseOrderingModel.PurchaseOrderingCount)
      await queryRunner.manager.update(CarEntity, { carPurchaseOrderingId: result.Id }, { PurchaseOrderingPrice: singlePurchaseOrderingPrice })
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

  async saveCarStorehouseMapping(storehouseCarMappingModel: StorehouseCarMappingEntity) {
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const result: any = await queryRunner.manager.save(storehouseCarMappingModel)
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
}
