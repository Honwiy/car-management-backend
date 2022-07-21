import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Branch')
export class BranchEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'int', nullable: true })
  BrandId: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  BranchCode: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  BranchName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  BranchBriefName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  BranchAddress: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  BranchShipingAddress: string

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  IsActive: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedDate: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedBy: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedDate: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedBy: string

}
