import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity('PermissionPage')
export class PermissionPageEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Index('IDX_PermissionCategoryId')
  @Column({comment: 'include both permission category and sub-category tables id column'})
  PermissionCategoryId: number

  @Index('IDX_PermissionPageCode')
  @Column({type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'})
  PermissionPageCode: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PermissionPageName: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PermissionPageIntro: string

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
