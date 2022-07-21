import { CategoryDto } from './../dto/category.dto';
import { Category } from './../sales.interface';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { convertDateToTimestampNum, convertTimstampNumToDate } from '../../common/utils/date'

@Entity('Category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CategoryCode: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CategoryName: string

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

export function CategoryDtoToModel(dto: CategoryDto): CategoryEntity {
  const model = new CategoryEntity()
  model.Id = dto.id
  model.CategoryCode = dto.categoryCode
  model.CategoryName = dto.categoryName
  model.IsActived = dto.isActived
  model.CreatedDate = dto.createdDate
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = dto.updatedDate
  model.UpdatedBy = dto.updatedBy
  return model
}

export function CategoryModelToDto(model: CategoryEntity): CategoryDto {
  const dto: CategoryDto = {
    id: model.Id,
    categoryCode: model.CategoryCode,
    categoryName: model.CategoryName,
    isActived: model.IsActived,
    createdDate: convertTimstampNumToDate(model.CreatedDate),
    createdBy: model.CreatedBy,
    updatedDate: convertTimstampNumToDate(model.UpdatedDate),
    updatedBy: model.UpdatedBy
  }
  return dto
}