import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'

@Entity('GeneralOption')
export class GeneralOptionEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column({type: 'int', nullable: true})
  BrandId: number

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  Category: string

  @Column({type: 'text', nullable: true})
  FuncitonName: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  Code: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  Name: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  SubName: string

  @Column({type: 'int', nullable: true})
  PermissionId: number

  @Column({type: 'int', nullable: true})
  isActive: number

  @ManyToOne(type => GeneralOptionEntity, GeneralOption => GeneralOption.GeneralOptions)
  @JoinColumn({ name: 'ParentId' })
  GeneralOption?: GeneralOptionEntity

  @OneToMany(type => GeneralOptionEntity, GeneralOption => GeneralOption.GeneralOption)
  GeneralOptions?: GeneralOptionEntity[]

}
