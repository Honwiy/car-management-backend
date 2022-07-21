import { Injectable } from '@nestjs/common'
import { Connection, Repository, SelectQueryBuilder, getConnection } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { convertDateToTimestampNum } from '../common/utils/date'
import { DerivativeItemEntity, derivativeItemDtoToModel } from './entity/derivative-item.entity'
import { DerivativeCategoryEntity, derivativeDerivativeListModelToDTO } from './entity/derivative-category.entity'
import { DerivativeItem } from './dto/derivative-item'
import { InsuranceTypeEntity } from './entity/InsuranceType.entity'
import { InsuranceOrderingMappingEntity, insuranceOrderingMappingDtoToModel } from './entity/InsuranceOrderingMapping.entity'
import { InsuranceOrderingMapping } from './dto/insuranceOrderingMapping'
import * as dayjs from 'dayjs'
import { of, throwError } from 'rxjs'

@Injectable()
export class DerivativeService {
  constructor(
    // private readonly connection: Connection
    @InjectRepository(DerivativeCategoryEntity)
    private readonly derivativeCategoryEntity: Repository<DerivativeCategoryEntity>
  ) { }

  async loadDerivativeList() {
    const categoryBuilder: SelectQueryBuilder<{}> = await this.derivativeCategoryEntity.createQueryBuilder('category')
    const result = await categoryBuilder.leftJoinAndSelect('category.DerivativeItems', 'derivativeItem').getMany()
    return result.map((derivativeCategory: DerivativeCategoryEntity) => derivativeDerivativeListModelToDTO(derivativeCategory))
  }

  async updateDerivativeItem(derivativeItem: DerivativeItem, categoryId?: number) {
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()
    await queryRunner.connect()
    const derivativeItemModel: DerivativeItemEntity = derivativeItemDtoToModel(derivativeItem)
    await queryRunner.startTransaction()
    try {
      if (categoryId) {
        const derivativeCategory = await connection.getRepository(DerivativeCategoryEntity).findOne(categoryId)
        derivativeItemModel.derivativeCategory = derivativeCategory
      }
      const result = await queryRunner.manager.save(derivativeItemModel)
      // await queryRunner.manager.save(users[1])
      await queryRunner.commitTransaction()
      return result
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction()
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release()
    }
  }

  async saveOrderingInsuranceInfo(req, insuranceInfo) {
    const queryRunner = getConnection().createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      // throw new Error()
      const insuranceTypeList = await getConnection().getRepository(InsuranceTypeEntity).find()
      const currentDate = dayjs().format('YYYY-MM-DD HH:MM:ss')
      let insuranceList: Array<InsuranceOrderingMapping> = []
      for (const insuranceTypeItem of insuranceTypeList) {
        for (const key of Object.keys(insuranceInfo)) {
          if (key === insuranceTypeItem.InsuranceCode && insuranceInfo[key] !== false) {
            const tempInsuranceItem = {
              insuranceTypeId: insuranceTypeItem.Id,
              orderingNumber: Number(insuranceInfo.orderingNumber),
              insuranceValue: insuranceInfo[key],
              isActived: 1,
              createdDate: currentDate,
              createdBy: req.headers.username,
              updatedDate: currentDate,
              updatedBy: req.headers.username
            }
            insuranceList.push(tempInsuranceItem)
          }
        }
      }
      const insuranceEntitys: any = insuranceList.map(item => insuranceOrderingMappingDtoToModel(item))
      for (const isuranceItem of insuranceEntitys) {
        await queryRunner.manager.save(isuranceItem)
      }
      await queryRunner.commitTransaction()
      return insuranceList
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      error.massage = '销售数据保存失败，请重试'
      return error
    } finally {
      await queryRunner.release()
    }
  }


}
