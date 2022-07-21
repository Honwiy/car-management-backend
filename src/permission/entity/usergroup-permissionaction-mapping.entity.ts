import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('UserGroupPermissionActionMapping')
export class UserGroupPermissionActionMappingEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({type: 'int', nullable: true})
  UserGroupId: number

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
