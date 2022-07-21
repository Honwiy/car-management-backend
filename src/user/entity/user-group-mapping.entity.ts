import {Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm'


@Entity('UserGroupMapping')
export class UserGroupMappingEntity {

  @PrimaryGeneratedColumn()
  Id: number

  @Index('IDX_UserId')
  @Column()
  UserId: number

  @Index('IDX_UserGroupId')
  @Column()
  UserGroupId: number

  @Column({type: 'tinyint', nullable: true, default: 1})
  IsActived: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  CreatedDate: string

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'  })
  CreatedBy: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  UpdatedDate: string

  @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4'  })
  UpdatedBy: string
}
