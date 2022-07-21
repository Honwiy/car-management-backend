import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity('PermissionSubCategory')
export class PermissionSubCategoryEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Index('IDX_PermissionCategoryId')
  @Column()
  PermissionCategoryId: number

  @Index('IDX_ParentId')
  @Column()
  ParentId: number

  @Index('IDX_PermissionSubCategoryCode')
  @Column({type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'})
  PermissionSubCategoryCode: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PermissionSubCategoryName: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PermissionSubCategoryIntro: string

  @Column({type: 'int', nullable: true})
  Priority: number

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
