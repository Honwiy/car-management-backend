import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Brand')
export class BrandEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  CompanyId: number

  @Column({ type: 'text', nullable: true, charset: 'utf8mb4' })
  BrandCode: string

  @Column({ type: 'text', nullable: true, charset: 'utf8mb4' })
  BrandName: string

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  IsActive: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedDate: string

  @Column({ type: 'text', nullable: true, charset: 'utf8mb4' })
  CreatedBy: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedDate: string

  @Column({ type: 'text', nullable: true, charset: 'utf8mb4' })
  UpdatedBy: string

}
