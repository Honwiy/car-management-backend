import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity('PermissionSection')
export class PermissionSectionEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({type: 'int', nullable: true})
  BrandId: number

  @Index('IDX_PermissionSectionCode')
  @Column({type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'})
  PermissionSectionCode: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PermissionSectionName: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PermissionSectionIntro: string

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
