import {Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm'


@Entity('UserGroup')
export class UserGroupEntity {

  @PrimaryGeneratedColumn()
  Id: number

  @Index('IDX_ParentId')
  @Column()
  ParentId: number

  @Index('IDX_UserGroupCode')
  @Column({ charset: 'utf8mb4' })
  UserGroupCode: string

  @Column({ charset: 'utf8mb4' })
  UserGroupText: string

  @Column({ charset: 'utf8mb4' })
  UserGroupIntro: string

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
