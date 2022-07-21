import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity('Department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Index('IDX_BranchId')
  @Column()
  BranchId: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  DepartmentCode: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  DepartmentName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  DepartmentBriefName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CorporateName: string

  @Column({ type: 'varchar', length: 55, nullable: true })
  ContactPhoneNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  ContactPerson: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  Introduction: string

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
