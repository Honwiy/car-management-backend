import { Injectable } from '@nestjs/common'
import { Repository, SelectQueryBuilder, Connection, getRepository } from 'typeorm'
import { BYD_PURCHASE_ORDERING_MAPPING, BYD_IN_STOREHOUSE_MAPPING } from '../common/mappings/car-information-file.mapping'
import { CarPropertyItemList, Car } from '../car/car.interface'
import { CarPurchaseOrderingDto, initCarPurchaseOrdering } from '../store-house/dto/car-purchase-ordering.dto'
import { CarDto, initCarDto, initCarPropertyItemList } from '../car/dto/car.dto'
import * as dayjs from 'dayjs'
import { StoreHouseService } from '../store-house/store-house.service'
import { InjectRepository } from '@nestjs/typeorm'
import { CarPurchaseOrderingEntity } from '../store-house/entity/car-purchase-ordering.entity'
import { CarEntity } from '../car/entity'
import { carModelToDto } from '../car/entity/car.entity'
import { CarService } from '../car/car.service'
import { CarPropertyItemMappingEntity } from '../car/entity/car-property-item-mapping.entity'
import { CAR_STATUS_MAPPING, CAR_SELLING_STATUS_MAPPING, CAR_STOREHOUSE_STATUS_MAPPING } from '../common/mappings/car-status.mapping'
import { StorehouseCarMappingEntity } from '../store-house/entity/storehouseCarMapping.entity'

enum CAR_INFO_IMPORT_TYPE {
  CHERRYPURCHASEORDERING = 'cherryPurchaseOrdering',
  CHERRYINSTOREHOUSE = 'cherryInStoreHouse',
  BYDPURCHASEORDERING = 'bydPurchaseOrdering',
  BYDINSTOREHOUSE = 'bydInStoreHouse'
}


@Injectable()
export class CarInfoImportService {
  constructor(
    // private readonly connection: Connection
    @InjectRepository(CarEntity)
    // private readonly carPurchaseOrderingEntity: Repository<CarPurchaseOrderingEntity>,
    private readonly carEntity: Repository<CarEntity>,
    // private readonly carPurchaseOrderingEntity: Repository<CarPurchaseOrderingEntity>,
    private readonly storeHouseService: StoreHouseService,
    private readonly carService: CarService,
    private readonly connection: Connection
  ) { }

  importCarInfomationFile(req, fileType: any, file: any) {
    // transmit file data from buffer to array
    let result
    const fileDataStr = JSON.stringify(file.buffer.toString())
    let tempArr = fileDataStr.split('\\r\\n')
    const fileDataArr = []
    for (let i = 1; i < tempArr.length - 1; i++) {
      let temp: any = tempArr.slice(i, i + 1)
      fileDataArr.push(temp[0].split(','))
    }
    switch (fileType) {
      case CAR_INFO_IMPORT_TYPE.CHERRYPURCHASEORDERING:
        result = this.importCherryPurchaseOrdering(req, fileDataArr)
        break
      case CAR_INFO_IMPORT_TYPE.CHERRYINSTOREHOUSE:
        result = this.importCherryInStoreHouse(req, fileDataArr)
        break
      case CAR_INFO_IMPORT_TYPE.BYDPURCHASEORDERING:
        result = this.importBydPurchaseOrdering(req, fileDataArr)
        break
      case CAR_INFO_IMPORT_TYPE.BYDINSTOREHOUSE:
        result = this.importBydInStoreHouse(req, fileDataArr)
        break
      default:
        break
    }
    return result
  }

  async importCherryPurchaseOrdering(req, fileDataArr: any[]) {
    console.log('cherryPurchaseOrdering -------- ', fileDataArr)
  }

  async importCherryInStoreHouse(req, fileDataArr: any[]) {
    console.log('cherryInStoreHouse -------- ', fileDataArr)
  }

  async importBydPurchaseOrdering(req, fileDataArr: any[]) {
    let importResult: boolean
    try {
      const currentDate = dayjs().format('YYYY-MM-DD HH:MM:ss')
      for (const fileDataItem of fileDataArr) {
        let carPurchaseOrderingDto: CarPurchaseOrderingDto = initCarPurchaseOrdering()
        let carItemMappingList: CarPropertyItemList = initCarPropertyItemList()
        let carDto: CarDto = initCarDto()
        // import car purchase ordering dto
        carPurchaseOrderingDto.purchaseOrderingCode = dayjs(new Date()).format('YYYYMMDDHHmmss')
        carPurchaseOrderingDto.purchaseOrderingNumber = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.purchaseOrderingNumber]
        carPurchaseOrderingDto.purchaseOrderingDate = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.purchaseOrderingDate]
        carPurchaseOrderingDto.purchaseOrderingPlanningDate = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.purchaseOrderingPlanningDate]
        carPurchaseOrderingDto.purchaseOrderingCount = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.purchaseOrderingCount]
        // carPurchaseOrderingDto.startPrice = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.startPrice]
        carPurchaseOrderingDto.purchaseOrderingTotalPrice = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.purchaseOrderingTotalPrice]
        // carPurchaseOrderingDto.preSellingPrice = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.preSellingPrice]
        carPurchaseOrderingDto.purchaseOrderingStatus = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.purchaseOrderingStatus]
        carPurchaseOrderingDto.paymentType = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.paymentType]
        carPurchaseOrderingDto.billingNumber = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.billingNumber]
        carPurchaseOrderingDto.cooperationBank = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.cooperationBank]
        carPurchaseOrderingDto.billingPrice = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.billingPrice]
        carPurchaseOrderingDto.billingStartDate = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.billingStartDate]
        carPurchaseOrderingDto.billingEndDate = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.billingEndDate]

        carPurchaseOrderingDto.createdDate = currentDate
        carPurchaseOrderingDto.createdBy = req.headers.username
        carPurchaseOrderingDto.updatedDate = currentDate
        carPurchaseOrderingDto.updatedBy = req.headers.username
        // import car item mapping list dto
        carItemMappingList.brand = 'BYD'
        carItemMappingList.carSeries = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.carSeries]
        carItemMappingList.carType = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.carType]
        carItemMappingList.carTypeCategory = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.carTypeCategory]
        carItemMappingList.carTypeCode = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.carTypeCode]
        carItemMappingList.transmission = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.transmission]
        carItemMappingList.carColor = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.carColor]
        carItemMappingList.carSweptVolume = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.carSweptVolume]
        carItemMappingList.productionAddress = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.productionAddress]
        carItemMappingList.productName = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.productName]
        // import car dto
        carDto.purchaseOrderingPrice = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.startPrice]
        carDto.standardSellPrice = fileDataItem[BYD_PURCHASE_ORDERING_MAPPING.preSellingPrice]
        carDto.carStatus = CAR_STATUS_MAPPING.INTRANSIT
        carDto.sellingStatus = CAR_SELLING_STATUS_MAPPING.UNSALED
        carDto.createdDate = currentDate
        carDto.createdBy = req.headers.username
        carDto.updatedDate = currentDate
        carDto.updatedBy = req.headers.username
        await this.storeHouseService.saveCarpurchaseOrdering(carPurchaseOrderingDto, carItemMappingList, carDto)
      }
      importResult = true
    } catch (error) {
      console.log(error)
      importResult = false
    } finally {
      return importResult
    }
  }

  async importBydInStoreHouse(req, fileDataArr: any[]) {
    let importResult
    const queryRunner = this.connection.createQueryRunner()
    try {
      const currentDate = dayjs().format('YYYY-MM-DD HH:MM:ss')
      for (const fileDataItem of fileDataArr) {
        const existedCarInfoList: any = await this.getCarInfoByImportingFile(fileDataItem, 'car')
        console.log('existedCarInfoList -----------', existedCarInfoList)
        // car info exist
        if (existedCarInfoList.length > 0) {
          for (let [index, carInfoItem] of new Map(existedCarInfoList.map((item: CarEntity, i) => [i, item]))) {
            /**
             * 1st scenario: get same vin and engine number car info
             * break the loop
             */
            if (carInfoItem['VinNumber'] === fileDataItem[BYD_IN_STOREHOUSE_MAPPING.vinNumber] && carInfoItem['EngineNumber'] === fileDataItem[BYD_IN_STOREHOUSE_MAPPING.engineNumber]) {
              break
            }
            /**
             * 2nd scenario: get empty Vin and Engine number car info
             * update car info table
             * break the loop
             */
            if (!carInfoItem['VinNumber'] && !carInfoItem['EngineNumber']) {
              carInfoItem['AnnouncementNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.announcementNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.announcementNumber] : ''
              carInfoItem['ArriveStoreDate'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.arriveStoreDate] ? dayjs(fileDataItem[BYD_IN_STOREHOUSE_MAPPING.arriveStoreDate]).valueOf() : null
              carInfoItem['BatteryPackNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.batteryPackNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.batteryPackNumber] : ''
              carInfoItem['CertificateNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] : ''
              carInfoItem['CertificateLocation'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation] : ''
              carInfoItem['CarStatus'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carStatus] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carStatus] : CAR_STATUS_MAPPING.INTRANSIT
              if (fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] || fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation]) {
                carInfoItem['CarStatus'] = CAR_STATUS_MAPPING.INSTOREHOUSE
              }
              carInfoItem['SellingStatus'] = CAR_SELLING_STATUS_MAPPING.UNSALED
              carInfoItem['EngineNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.engineNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.engineNumber] : ''
              carInfoItem['GearboxNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.gearboxNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.gearboxNumber] : ''
              carInfoItem['isThirdParty'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.isThirdParty] === 'Y' ? 1 : 0
              carInfoItem['isLocked'] = 0
              carInfoItem['ManufacturedDate'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.manufacturedDate] ? dayjs(fileDataItem[BYD_IN_STOREHOUSE_MAPPING.manufacturedDate]).valueOf() : ''
              carInfoItem['ProductionDate'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.productionDate] ? dayjs(fileDataItem[BYD_IN_STOREHOUSE_MAPPING.productionDate]).valueOf() : ''
              carInfoItem['VinNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.vinNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.vinNumber] : ''
              carInfoItem['StoreDateCount'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.StoreDateCount] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.StoreDateCount] : null
              carInfoItem['isActive'] = 1
              carInfoItem['UpdatedBy'] = req.headers.username
              carInfoItem['UpdatedDate'] = dayjs(currentDate).valueOf()
              carInfoItem['CreatedBy'] = req.headers.username
              carInfoItem['CreatedDate'] = dayjs(currentDate).valueOf()
              const carInfoResult = await this.carService.saveOrUpdateCarInfo(carInfoItem as CarEntity)
                if (carInfoResult) {
                  const storehouseCarMappingModel = new StorehouseCarMappingEntity()
                  storehouseCarMappingModel.CarId = carInfoResult.Id
                  storehouseCarMappingModel.StoreHouseId = 1
                  storehouseCarMappingModel.Status = CAR_STOREHOUSE_STATUS_MAPPING.PURCHASE_ORDERING_INVENTORY
                  if (fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] || fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation]) {
                    storehouseCarMappingModel.Status = CAR_STOREHOUSE_STATUS_MAPPING.SALEDABLE_INVENTORY
                  }
                  storehouseCarMappingModel.CreatedDate = carInfoResult.CreatedDate
                  storehouseCarMappingModel.CreatedBy = carInfoResult.CreatedBy
                  storehouseCarMappingModel.UpdatedDate = carInfoResult.UpdatedDate
                  storehouseCarMappingModel.UpdatedBy = carInfoResult.UpdatedBy
                  const findStorehouseCarMapping = await this.connection.getRepository(StorehouseCarMappingEntity).find({CarId: carInfoResult.Id})
                  if (findStorehouseCarMapping.length > 0) {
                    storehouseCarMappingModel.Id = findStorehouseCarMapping[0].Id
                  }
                  await this.storeHouseService.saveCarStorehouseMapping(storehouseCarMappingModel)
                }
              break
            }
            /**
             * 3rd scenario: still get diff vin or engine number car info in the last index of car map
             * update purchase ordering count in car purchase table
             * insert car info table
             * break the loop
             */
            if ((carInfoItem['VinNumber'] !== fileDataItem[BYD_IN_STOREHOUSE_MAPPING.vinNumber]
              || carInfoItem['EngineNumber'] !== fileDataItem[BYD_IN_STOREHOUSE_MAPPING.engineNumber])
              && index === (existedCarInfoList.length - 1)) {
                // init updating purchase ordering count
                const existedCarPurchaseOrderingList: Array<CarPurchaseOrderingEntity> = await this.getCarInfoByImportingFile(fileDataItem, 'carPurchaseOrdering')
                existedCarPurchaseOrderingList[0].PurchaseOrderingCount = existedCarPurchaseOrderingList[0].PurchaseOrderingCount + 1
                // init new car info which need to save into car table
                delete carInfoItem['Id']
                carInfoItem['AnnouncementNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.announcementNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.announcementNumber] : ''
                carInfoItem['ArriveStoreDate'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.arriveStoreDate] ? dayjs(fileDataItem[BYD_IN_STOREHOUSE_MAPPING.arriveStoreDate]).valueOf().toString() : null
                carInfoItem['BatteryPackNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.batteryPackNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.batteryPackNumber] : ''
                carInfoItem['CertificateNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] : ''
                carInfoItem['CertificateLocation'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation] : ''
                carInfoItem['CarStatus'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carStatus] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carStatus] : CAR_STATUS_MAPPING.INTRANSIT
                if (fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] || fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation]) {
                  carInfoItem['CarStatus'] = CAR_STATUS_MAPPING.INSTOREHOUSE
                }
                carInfoItem['SellingStatus'] = CAR_SELLING_STATUS_MAPPING.UNSALED
                carInfoItem['EngineNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.engineNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.engineNumber] : ''
                carInfoItem['GearboxNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.gearboxNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.gearboxNumber] : ''
                carInfoItem['isThirdParty'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.isThirdParty] === 'Y' ? 1 : 0
                carInfoItem['isLocked'] = 0
                carInfoItem['ManufacturedDate'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.manufacturedDate] ? dayjs(fileDataItem[BYD_IN_STOREHOUSE_MAPPING.manufacturedDate]).valueOf() : ''
                carInfoItem['ProductionDate'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.productionDate] ? dayjs(fileDataItem[BYD_IN_STOREHOUSE_MAPPING.productionDate]).valueOf() : ''
                carInfoItem['VinNumber'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.vinNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.vinNumber] : ''
                carInfoItem['StoreDateCount'] = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.StoreDateCount] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.StoreDateCount] : null
                carInfoItem['isActive'] = 1
                carInfoItem['CreatedDate'] = dayjs(currentDate).valueOf()
                carInfoItem['CreatedBy'] = req.headers.username
                carInfoItem['UpdatedDate'] = dayjs(currentDate).valueOf()
                carInfoItem['UpdatedBy'] = req.headers.username
                carInfoItem['CarPropertyItemMappingId'] = existedCarPurchaseOrderingList[0].CarPropertyItemMappingId
                carInfoItem['CarPurchaseOrderingNumber'] = existedCarPurchaseOrderingList[0].PurchaseOrderingNumber
                carInfoItem['PurchaseOrderingPrice'] = Number(existedCarPurchaseOrderingList[0].PurchaseOrderingTotalPrice) / existedCarPurchaseOrderingList[0].PurchaseOrderingCount
                carInfoItem['StandardSellPrice'] = Number(existedCarPurchaseOrderingList[0].PurchaseOrderingTotalPrice) / existedCarPurchaseOrderingList[0].PurchaseOrderingCount
                await queryRunner.connect()
                await queryRunner.startTransaction()
                await queryRunner.manager.save(existedCarPurchaseOrderingList[0])
                const carInfoResult = await this.carService.saveOrUpdateCarInfo((carInfoItem) as CarEntity)
                if (carInfoResult) {
                  const storehouseCarMappingModel = new StorehouseCarMappingEntity()
                  storehouseCarMappingModel.CarId = carInfoResult.Id
                  storehouseCarMappingModel.StoreHouseId = 1
                  storehouseCarMappingModel.Status = CAR_STOREHOUSE_STATUS_MAPPING.PURCHASE_ORDERING_INVENTORY
                  if (fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] || fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation]) {
                    storehouseCarMappingModel.Status = CAR_STOREHOUSE_STATUS_MAPPING.SALEDABLE_INVENTORY
                  }
                  storehouseCarMappingModel.CreatedDate = carInfoResult.CreatedDate
                  storehouseCarMappingModel.CreatedBy = carInfoResult.CreatedBy
                  storehouseCarMappingModel.UpdatedDate = carInfoResult.UpdatedDate
                  storehouseCarMappingModel.UpdatedBy = carInfoResult.UpdatedBy
                  const findStorehouseCarMapping = await this.connection.getRepository(StorehouseCarMappingEntity).find({CarId: carInfoResult.Id})
                  if (findStorehouseCarMapping.length > 0) {
                    storehouseCarMappingModel.Id = findStorehouseCarMapping[0].Id
                  }
                  await this.storeHouseService.saveCarStorehouseMapping(storehouseCarMappingModel)
                }
                await queryRunner.commitTransaction()
            }
          }
        } else {
          let carPurchaseOrderingDto: CarPurchaseOrderingDto = initCarPurchaseOrdering()
          let carItemMappingList: CarPropertyItemList = initCarPropertyItemList()
          let carDto: CarDto = initCarDto()
          // import car purchase ordering dto
          carPurchaseOrderingDto.purchaseOrderingCode = dayjs(new Date()).format('YYYYMMDDHHmmss')
          carPurchaseOrderingDto.purchaseOrderingNumber = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.purchaseOrderingNumber]
          carPurchaseOrderingDto.purchaseOrderingPlanningDate = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.purchaseOrderingPlanningDate]
          carPurchaseOrderingDto.purchaseOrderingCount = 1
          carPurchaseOrderingDto.createdDate = currentDate
          carPurchaseOrderingDto.createdBy = req.headers.username
          carPurchaseOrderingDto.updatedDate = currentDate
          carPurchaseOrderingDto.updatedBy = req.headers.username
          // import car item mapping list dto
          carItemMappingList.brand = 'BYD'
          carItemMappingList.carSeries = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carSeries]
          carItemMappingList.carType = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carType]
          carItemMappingList.carTypeCategory = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carTypeCategory]
          carItemMappingList.carTypeCode = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carTypeCode]
          carItemMappingList.transmission = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.transmission]
          carItemMappingList.carColor = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carColor]
          carItemMappingList.carSweptVolume = ''
          carItemMappingList.productionAddress = ''
          carItemMappingList.productName = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.productName]
          // import car dto
          carDto.announcementNumber = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.announcementNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.announcementNumber] : ''
          carDto.arriveStoreDate = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.arriveStoreDate] ? dayjs(fileDataItem[BYD_IN_STOREHOUSE_MAPPING.arriveStoreDate]).format('YYYY-MM-DD HH:mm:ss') : null
          carDto.batteryPackNumber = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.batteryPackNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.batteryPackNumber] : ''
          carDto.certificateNumber = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] : ''
          carDto.certificateLocation = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation] : ''
          carDto.carStatus = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carStatus] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.carStatus] : CAR_STATUS_MAPPING.INTRANSIT
          if (fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateNumber] || fileDataItem[BYD_IN_STOREHOUSE_MAPPING.certificateLocation]) {
            carDto.carStatus = CAR_STATUS_MAPPING.INSTOREHOUSE
          }
          carDto.sellingStatus = CAR_SELLING_STATUS_MAPPING.UNSALED
          carDto.engineNumber = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.engineNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.engineNumber] : ''
          carDto.gearboxNumber = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.gearboxNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.gearboxNumber] : ''
          carDto.isThirdParty = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.isThirdParty] === 'Y' ? 1 : 0
          carDto.isLocked = 0
          carDto.manufacturedDate = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.manufacturedDate] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.manufacturedDate] : ''
          carDto.productionDate = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.productionDate] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.productionDate] : ''
          carDto.vinNumber = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.vinNumber] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.vinNumber] : ''
          carDto.storeDateCount = fileDataItem[BYD_IN_STOREHOUSE_MAPPING.StoreDateCount] ? fileDataItem[BYD_IN_STOREHOUSE_MAPPING.StoreDateCount] : null
          carDto.isActive = 1
          carDto.createdBy = req.headers.username
          carDto.createdDate = currentDate
          carDto.updatedBy = req.headers.username
          carDto.updatedDate = currentDate
          await this.storeHouseService.saveCarpurchaseOrdering(carPurchaseOrderingDto, carItemMappingList, carDto)
        }
      }
      importResult = true
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      importResult = false
    } finally {
      await queryRunner.release()
      return importResult
    }
  }

  async getCarInfoByImportingFile(carImportingItem, primaryType) {
    try {
      let result
      switch (primaryType) {
        case 'car':
          const builder: SelectQueryBuilder<{}> = await this.carEntity.createQueryBuilder('car')
            .leftJoinAndSelect(CarPropertyItemMappingEntity, 'carPropertyItemMapping', 'car.CarPropertyItemMappingId = carPropertyItemMapping.Id')
            .leftJoinAndSelect(CarPurchaseOrderingEntity, 'carPurchaseOrdering', 'car.CarPurchaseOrderingNumber = carPurchaseOrdering.PurchaseOrderingNumber')
          // .addSelect('carPurchaseOrdering.PurchaseOrderingCount', 'PurchaseOrderingCount')
          // .addSelect('car.EngineNumber', 'EngineNumber')
          builder.where('1=1')
          getBYDCarInfoBuilderWhereClause(builder, carImportingItem)
          result = await builder.getMany() as Array<CarPurchaseOrderingEntity>
          break
        case 'carPurchaseOrdering':
          const carPurchaseOrderingBuilder: SelectQueryBuilder<{}> = await getRepository(CarPurchaseOrderingEntity).createQueryBuilder('carPurchaseOrdering')
            .leftJoinAndSelect(CarPropertyItemMappingEntity, 'carPropertyItemMapping', 'carPurchaseOrdering.CarPropertyItemMappingId = carPropertyItemMapping.Id')
            .leftJoinAndSelect(CarEntity, 'car', 'car.CarPurchaseOrderingNumber = carPurchaseOrdering.PurchaseOrderingNumber')
          // .addSelect('carPurchaseOrdering.PurchaseOrderingCount', 'PurchaseOrderingCount')
          // .addSelect('car.EngineNumber', 'EngineNumber')
          carPurchaseOrderingBuilder.where('1=1')
          getBYDCarInfoBuilderWhereClause(carPurchaseOrderingBuilder, carImportingItem)
          result = await carPurchaseOrderingBuilder.getMany() as Array<CarPurchaseOrderingEntity>
          break
        default:
          break
      }
      return result
    } catch (error) {
      console.log(error)
    }
  }
}


function getBYDCarInfoBuilderWhereClause(builder, carImportingItem) {
  try {
    Object.keys(carImportingItem)
      .map(key => {
        if (carImportingItem[key]) {
          switch (key) {
            // case BYD_IN_STOREHOUSE_MAPPING.vinNumber.toString():
            //   if (carImportingItem[key]) {
            //     builder.andWhere('car.VinNumber = :vinNumber', { vinNumber: '' })
            //   }
            //   break
            // case BYD_IN_STOREHOUSE_MAPPING.engineNumber.toString():
            //   if (carImportingItem[key]) {
            //     builder.andWhere('car.EngineNumber = :engineNumber', { engineNumber: '' }).limit(1)
            //   }
            //   break
            case BYD_IN_STOREHOUSE_MAPPING.carSeries.toString():
              builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.carSeries') = :carSeries`, { carSeries: carImportingItem[key] })
              break
            case BYD_IN_STOREHOUSE_MAPPING.productName.toString():
              builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.productName') = :productName`, { productName: carImportingItem[key] })
              break
            case BYD_IN_STOREHOUSE_MAPPING.carType.toString():
              builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.carType') = :carType`, { carType: carImportingItem[key] })
              break
            case BYD_IN_STOREHOUSE_MAPPING.carTypeCategory.toString():
              builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.carTypeCategory') = :carTypeCategory`, { carTypeCategory: carImportingItem[key] })
              break
            case BYD_IN_STOREHOUSE_MAPPING.carTypeCode.toString():
              builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.carTypeCode') = :carTypeCode`, { carTypeCode: carImportingItem[key] })
              break
            case BYD_IN_STOREHOUSE_MAPPING.carColor.toString():
              builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.carColor') = :carColor`, { carColor: carImportingItem[key] })
              break
            case BYD_IN_STOREHOUSE_MAPPING.transmission.toString():
              builder.andWhere(`json_extract(carPropertyItemMapping.CarPropertyItemList,'$.transmission') = :transmission`, { transmission: carImportingItem[key] })
              break
            case BYD_IN_STOREHOUSE_MAPPING.purchaseOrderingNumber.toString():
              builder.andWhere('carPurchaseOrdering.PurchaseOrderingNumber = :purchaseOrderingNumber', { purchaseOrderingNumber: carImportingItem[key] })
              break
            default:
              break
          }
        }
      })
  } catch (error) {
    console.log(error)
  }
}
