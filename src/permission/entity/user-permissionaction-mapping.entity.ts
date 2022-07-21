import { UserPermissionactionMappingDto } from './../dto/user-permissionaction-mapping.dto';
import { UserPermissionactionMapping } from './../permission.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('UserPermissionActionMapping')
export class UserPermissionActionMappingEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({type: 'int', nullable: true})
  UserId: number

  @Column({type: 'text', nullable: true})
  PermissionActionId: number

  @Column({type: 'int', nullable: true})
  BranchId: number

  @Column({type: 'int', nullable: true})
  isActived: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedDate: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedBy: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedDate: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedBy: string

}

export function userPermissionactionMappingItemToEntity(dto: UserPermissionactionMappingDto): UserPermissionActionMappingEntity {
  const model = new UserPermissionActionMappingEntity()
  model.Id = dto.id
  model.UserId = dto.userId
  model.PermissionActionId = dto.permissionActionId
  model.BranchId = dto.branchId
  model.isActived = dto.isActived
  model.CreatedDate = dto.createdDate
  model.CreatedBy = dto.createdBy
  model.UpdatedDate = dto.updatedDate
  model.UpdatedBy = dto.updatedBy
  return model
}

