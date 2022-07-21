import { Injectable } from '@nestjs/common'
import { GeneralOptionEntity } from './generaloption.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like, getRepository, getConnection } from 'typeorm'
import { GeneralOption, IGeneralOptionList } from './generaloption.interface'
import { CarPropertyEntity, CarPropertyItemEntity, CarTablesName } from '../car/entity'

enum DROPDOWN_CATEGORY {
  CAR = 'Car',
  DERIVATIVE = 'Derivative',
  ACCESSORY = 'Accessory'
}

@Injectable()
export class GeneralOptionService {
  constructor(
    @InjectRepository(GeneralOptionEntity)
    private readonly generaloptionRepository: Repository<GeneralOptionEntity>
  ) { }

  async findList(filter: any): Promise<Array<GeneralOption>> {
    let whereObj: any = {
      FuncitonName: filter.FuncitonName,
      IsActive: 1,
    }
    if (filter.BrandId) {
      whereObj.BrandId = filter.BrandId
    }

    const generaloptionList = await this.generaloptionRepository.find({
      where: whereObj
    })

    return generaloptionList
  }

  async getDropDownListByCategory(dropdownCategory: any): Promise<Array<any>> {
    let result: any
    switch (dropdownCategory) {
      case DROPDOWN_CATEGORY.CAR:
        result = this.getCarDropdownList()
        break
      case DROPDOWN_CATEGORY.ACCESSORY:
        result = this.getAccessoryDropdownList()
        break

      case DROPDOWN_CATEGORY.DERIVATIVE:
        result = this.getDerivativeDropdownList()
        break

      default:
        break
    }
    return result
  }

  async getCarDropdownList() {
    try {
      const repo = await getRepository(CarTablesName.CarProperty)
    const dropDownResult: any[] = await repo.createQueryBuilder('property')
      .leftJoinAndSelect('property.CarPropertyItems', 'CarPropertyItem')
      .where('property.isActive = 1')
      .andWhere('CarPropertyItem.isActive = 1')
      .getMany()
    return dropDownResult
    } catch (error) {
      console.log(error)
    }
    // const dropDownList: IGeneralOptionList = new IGeneralOptionList(dropDownResult)
    // return dropDownList.initGeneralOptionList()
  }

  async getAccessoryDropdownList() {
    return 'accessory-dropdown'
  }

  async getDerivativeDropdownList() {
    return 'derivative-dropdown'
  }

  async findOneDropdownList(code: any): Promise<Array<GeneralOption>> {

    const result = await this.generaloptionRepository.find({
      where: {
        FuncitonName: code,
        IsActive: 1
      }
    })
    return result
  }

  async save(generaloption: GeneralOption): Promise<GeneralOption> {
    return await this.generaloptionRepository.save(generaloption)
  }
}
