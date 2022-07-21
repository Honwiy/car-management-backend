import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { Brand } from '../interface/brand.interface'
import { BrandEntity } from '../entity/brand.entity'

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>
  ) { }

  async findList(filter: any): Promise<Array<Brand>> {

    const brandList = await this.brandRepository.find({
      where: {
        IsActive: filter.IsActive,
      }
    })
    return brandList
  }

}
