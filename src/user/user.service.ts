import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository, DeleteResult } from 'typeorm'
import { UserEntity } from './entity/user.entity'
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto'
const jwt = require('jsonwebtoken')
import { SECRET } from '../config'
import { UserRO, UserInfoRO, UserGroupMapping, OrganizationItem, initUserInfo } from './user.interface'
import { validate } from 'class-validator'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { HttpStatus } from '@nestjs/common'
import * as crypto from 'crypto'
import { UserGroupEntity } from './entity/user-group.entity'
import { UserGroupMappingEntity } from './entity/user-group-mapping.entity'
import { UserDepartmentMappingEntity } from './entity/user-department-mapping.entity'
import { DepartmentEntity } from '../hierarchy/entity/department.entity'
import { UserBranchMappingEntity } from './entity/user-branch-mapping.entity'
import { BranchEntity } from '../hierarchy/entity/branch.entity'
import { BrandEntity } from '../hierarchy/entity/brand.entity'



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async findOne(loginUserDto: LoginUserDto): Promise<UserInfoRO> {
    const findOneOptions = {
      Email: loginUserDto.Email,
      Password: crypto.createHmac('sha256', loginUserDto.Password).digest('hex'),
    }
    const loginUserArr = await getRepository(UserEntity).createQueryBuilder('user')
      .leftJoinAndSelect(UserGroupMappingEntity, 'ugm', 'ugm.UserId = user.Id')
      .leftJoinAndSelect(UserGroupEntity, 'ug', 'ugm.UserGroupId = ug.Id')
      // .leftJoinAndSelect(UserDepartmentMappingEntity, 'udm', 'udm.UserId = user.Id')
      // .leftJoinAndSelect(DepartmentEntity, 'd', 'd.Id = udm.DepartmentId')
      .leftJoinAndSelect(UserBranchMappingEntity, 'ubm', 'user.Id = ubm.UserId')
      .leftJoinAndSelect(BranchEntity, 'branch', 'branch.Id = ubm.BranchId')
      .leftJoinAndSelect(BrandEntity, 'brand', 'brand.Id = branch.BrandId')
      .select([
        'user.Id',
        'user.Username',
        'user.Email',
        'user.Mobile',
        'ug.Id',
        'ug.UserGroupCode',
        'ug.UserGroupText',
        // 'd.Id',
        // 'd.DepartmentCode',
        // 'd.DepartmentName',
        'branch.Id',
        'branch.BranchCode',
        'branch.BranchName',
        'brand.Id',
        'brand.BrandCode',
        'brand.BrandName'
      ])
      .where(findOneOptions)
      .getRawMany()
    let resUserInfo: any = initUserInfo()
    resUserInfo.user.UserId = loginUserArr[0].user_Id
    resUserInfo.user.Username = loginUserArr[0].user_Username
    resUserInfo.user.Email = loginUserArr[0].user_Email
    resUserInfo.user.Mobile = loginUserArr[0].user_Mobile
    for (const userItem of loginUserArr) {
      let userGroupItem: UserGroupMapping = {}
      let organizationParentItem: OrganizationItem
      if (resUserInfo.organizations.length === 0) {
        organizationParentItem = { value: '', label: '', children: [] }
        organizationParentItem.value = userItem.brand_BrandCode
        organizationParentItem.label = userItem.brand_BrandName
        organizationParentItem.children.push({ value: userItem.branch_BranchCode, label: userItem.branch_BranchName, isLeaf: true })
        resUserInfo.organizations.push(organizationParentItem)
      } else {
        resUserInfo.organizations.map(item => {
          if (item.value === userItem.brand_BrandCode) {
            item.children.push({ value: userItem.branch_BranchCode, label: userItem.branch_BranchName, isLeaf: true })
          } else {
            organizationParentItem = { value: '', label: '', children: [] }
            organizationParentItem.value = userItem.brand_BrandCode
            organizationParentItem.label = userItem.brand_BrandName
            organizationParentItem.children.push({ value: userItem.branch_BranchCode, label: userItem.branch_BranchName, isLeaf: true })
            resUserInfo.organizations.push(organizationParentItem)
          }
        })
      }
      userGroupItem.BrandId = userItem.brand_Id
      userGroupItem.BrandCode = userItem.brand_BrandCode
      userGroupItem.BrandText = userItem.brand_BrandName
      userGroupItem.BranchId = userItem.branch_Id
      userGroupItem.BranchCode = userItem.branch_BranchCode
      userGroupItem.BranchText = userItem.branch_BranchName
      userGroupItem.UserGroupId = userItem.ug_Id
      userGroupItem.UserGroupCode = userItem.ug_UserGroupCode
      userGroupItem.UserGroupText = userItem.ug_UserGroupText
      resUserInfo.userGroup.push(userGroupItem)
    }
    return resUserInfo
  }

  // TODO: update create function
  // async create(dto: CreateUserDto): Promise<UserRO> {

  //   // check uniqueness of Username/Email
  //   const { Username, Email, Password, Mobile } = dto
  //   const qb = await getRepository(UserEntity)
  //     .createQueryBuilder('user')
  //     .where('user.Email = :Email', { Email })

  //   const user = await qb.getOne()

  //   if (user) {
  //     const error = { Username: 'Email must be unique.' }
  //     throw new HttpException({ message: 'Input data validation failed', error }, HttpStatus.BAD_REQUEST)
  //   }

  //   // create new user
  //   let newUser = new UserEntity()
  //   newUser.Username = Username
  //   newUser.Email = Email
  //   newUser.Password = Password
  //   newUser.Mobile = Mobile


  //   const errors = await validate(newUser)
  //   if (errors.length > 0) {
  //     const _errors = { Username: 'Userinput is not valid.' }
  //     throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST)

  //   } else {
  //     const savedUser = await this.userRepository.save(newUser)
  //     return this.buildUserRO(savedUser)
  //   }

  // }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    let toUpdate = await this.userRepository.findOne(id)
    delete toUpdate.Password


    let updated = Object.assign(toUpdate, dto)
    return await this.userRepository.save(updated)
  }

  async delete(Email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ Email: Email })
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOne(id)

    if (!user) {
      const errors = { User: 'User not found' }
      throw new HttpException({ errors }, 401)
    }
    return
    // return this.buildUserRO(user)
  }

  // TODO: find user by email/name/phone
  // async findByEmail(Email: string): Promise<UserRO> {
  //   const user = await this.userRepository.findOne({ Email: Email })
  //   return this.buildUserRO(user)
  // }

  public generateJWT(userObj) {
    let today = new Date()
    let exp = new Date(today)
    exp.setDate(today.getDate() + 1)

    return jwt.sign({
      id: userObj.user.UserId,
      Username: userObj.user.Username,
      Email: userObj.user.Email,
      Mobile: userObj.user.Mobile,
      Organizations: userObj.organizations,
      UserGroup: userObj.userGroup,
      exp: exp.getTime() / 1000,
    }, SECRET)
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      Username: user.Username,
      Email: user.Email,
      token: this.generateJWT(user),
      Image: user.Image
    }

    return { user: userRO }
  }
}
