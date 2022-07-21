import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity('PermissionCategory')
export class PermissionCategoryEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Index('IDX_PermissionSectionId')
  @Column()
  PermissionSectionId: number

  @Index('IDX_PermissionCategoryCode')
  @Column({type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'})
  PermissionCategoryCode: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PermissionCategoryName: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PermissionCategoryIntro: string

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
