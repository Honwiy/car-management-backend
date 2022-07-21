import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany} from 'typeorm'
import { IsEmail, Validate } from 'class-validator'
import * as crypto from 'crypto'


@Entity('User')
export class UserEntity {

  @PrimaryGeneratedColumn()
  Id: number

  @Column({ charset: 'utf8mb4' })
  Username: string

  @Column()
  @IsEmail()
  Email: string

  @Column({default: ''})
  Image: string

  @Column()
  Password: string

  @Column({type: 'varchar', length: 55})
  Mobile: string

  @Column({type: 'varchar', length: 1000, nullable: true, charset: 'utf8mb4'  })
  OfficeLocation: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  EntryDate: string

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

  @BeforeInsert()
  hashPassword() {
    this.Password = crypto.createHmac('sha256', this.Password).digest('hex')
  }
}
