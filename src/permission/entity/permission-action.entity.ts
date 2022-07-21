import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity('PermissionAction')
export class PermissionActionEntity {
  @PrimaryGeneratedColumn()
  Id: number

  @Column()
  PermissionPageId: number

  @Index('IDX_PermissionActionCode')
  @Column({type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'})
  PermissionActionCode: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  PermissionActionText: string

  @Column({type: 'text', nullable: true, charset: 'utf8mb4'})
  DefineSymbol: string

  @Column({type: 'int', nullable: true})
  Priority: number

  @Column({type: 'tinyint', nullable: true, default: 1})
  IsActived: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedDate: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedBy: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedDate: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedBy: string

}
