import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Company')
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CompanyName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CompanyBriefName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CompanyCode: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CorporateName: string

  @Column({ type: 'varchar', length: 55, nullable: true })
  ContactPhoneNumber: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  ContactPerson: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  ShippingAddress: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  PostCode: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  BankAccountName: string

  @Column({ type: 'int', nullable: true })
  BankAccountNumber: number

  @Column({ type: 'int', nullable: true })
  TaxNumber: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  SecondShippingAddress: string

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
