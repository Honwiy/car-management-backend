import {Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm'


@Entity('UserDepartmentMapping')
export class UserDepartmentMappingEntity {

  @PrimaryGeneratedColumn()
  Id: number

  @Index('IDX_UserId')
  @Column()
  UserId: number

  @Index('IDX_DepartmentId')
  @Column()
  DepartmentId: number

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
