import { UserService } from './../user/user.service'
import { UserGroupEntity } from './../user/entity/user-group.entity'
import { UserGroupMappingEntity } from './../user/entity/user-group-mapping.entity'
import { map } from 'rxjs/operators'
import { UserPermissionActionMappingEntity, userPermissionactionMappingItemToEntity } from './entity/user-permissionaction-mapping.entity'
import { PermissionActionEntity } from './entity/permission-action.entity'
import { PermissionPageEntity } from './entity/permission-page.entity'
import { PermissionCategoryEntity } from './entity/permission-category.entity'
import { PermissionSectionEntity } from './entity/permission-section.entity'
import { BrandEntity } from './../hierarchy/entity/brand.entity'
import { BranchEntity } from './../hierarchy/entity/branch.entity'
import { UserBranchMappingEntity } from './../user/entity/user-branch-mapping.entity'
import { UserEntity } from './../user/entity/user.entity'
import { UserList, PermissionSearchFilter, InitUserList, UserListRO, BranchList } from './permission.interface'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository, getConnection } from 'typeorm'
import { async } from 'rxjs/internal/scheduler/async'
import dayjs = require('dayjs')
import { convertDateToTimestampNum } from '../common/utils/date'
import * as crypto from 'crypto'

@Injectable()
export class PermissionService {
    constructor(
        // @InjectRepository(UserEntity)
        // private readonly userListRepository: Repository<UserEntity>,
        private userService: UserService
    ) { }

    async getBranchList(): Promise<Array<any>> {
        const branchList: any = await getRepository(BranchEntity).createQueryBuilder('branch')
            .leftJoinAndSelect(BrandEntity, 'brand', 'brand.Id=branch.BrandId')
            .select([
                'branch.Id',
                'branch.BranchName'
            ])
            .addSelect('brand.BrandName')
            .orderBy('branch.Id')
            .getRawMany()

        let resBranchList: any = []

        for (const branchItem of branchList) {
            let branchItemArr: BranchList = {}
            branchItemArr.BranchId = branchItem.branch_Id
            branchItemArr.BranchName = branchItem.branch_BranchName
            branchItemArr.BrandName = branchItem.brand_BrandName
            resBranchList.push(branchItemArr)
        }
        return resBranchList
    }

    async searchUser(filter: any): Promise<UserListRO> {
        let whereObj: any = {}
        if (filter.Name) {
            whereObj.Username = filter.Name
        }
        if (filter.Phone) {
            whereObj.Mobile = filter.Phone
        }

        const builder = getRepository(UserEntity).createQueryBuilder('user')
            .leftJoinAndSelect(UserBranchMappingEntity, 'ubm', 'user.Id=ubm.UserId')
            .leftJoinAndSelect(BranchEntity, 'branch', 'branch.Id=ubm.BranchId')
            .leftJoinAndSelect(BrandEntity, 'brand', 'brand.Id=branch.BrandId')
            .select([
                'user.Id',
                'user.Username',
                'user.Email',
                'user.Mobile'
            ])
            .addSelect('branch.BranchName')
            .addSelect('branch.Id')
            .addSelect('brand.BrandName')
            .where(whereObj)
            .andWhere('user.isActived = 1')

        if (filter.BranchId) {
            builder.andWhere('branch.Id = :id', { id: filter.BranchId })
        }

        const userListArr = await builder.orderBy('user.Id').getRawMany()

        let resUserList: any = InitUserList()

        for (const userItem of userListArr) {
            let userItemArr: UserList = {}
            userItemArr.Id = userItem.user_Id
            userItemArr.Username = userItem.user_Username
            userItemArr.Email = userItem.user_Email
            userItemArr.Mobile = userItem.user_Mobile
            userItemArr.BranchName = userItem.branch_BranchName
            userItemArr.BrandName = userItem.brand_BrandName
            userItemArr.BranchId = userItem.branch_Id
            resUserList.userListArr.push(userItemArr)
        }

        return resUserList
    }

    async getPermissionSectionArr() {
        let resPermissionArr: any = []
        const sectionArr: any = await getRepository(PermissionSectionEntity).find({
            where: {
                IsActive: 1
            }
        })
        for (const items of sectionArr) {
            let itemArray: any = {}
            itemArray.PermissionSectionName = items.PermissionSectionName
            itemArray.ChildArr = await this.getPermssionCategoryArr(items.Id)
            resPermissionArr.push(itemArray)

        }
        return resPermissionArr
    }

    async getPermssionCategoryArr(sectionId: any) {
        let resPermissionArr: any = []
        let whereObj: any = {
            isActived: 1,
            PermissionSectionId: sectionId
        }
        const categoryArr: any = await getRepository(PermissionCategoryEntity).createQueryBuilder('PermissionCategory')
            .where(whereObj)
            .getRawMany()

        for (const items of categoryArr) {
            let itemArray: any = {}
            itemArray.PermissionCategoryName = items.PermissionCategory_PermissionCategoryName
            itemArray.ChildArr = await this.getPermssionPageArr(items.PermissionCategory_Id)
            resPermissionArr.push(itemArray)
        }
        return resPermissionArr
    }

    async getPermssionPageArr(categoryId) {
        let resPermissionArr: any = []
        const pageArr: any = await getRepository(PermissionPageEntity).find({
            where: {
                PermissionCategoryId: categoryId,
                IsActive: 1
            }
        })
        for (const items of pageArr) {
            let itemArray: any = {}
            itemArray.PermissionPageName = items.PermissionPageName
            itemArray.ActionObj = await this.getPermssionActionArr(items.Id)
            resPermissionArr.push(itemArray)
        }
        return resPermissionArr
    }

    async getPermssionActionArr(pageId) {
        let resPermissionArr: any = []
        const actionArr: any = await getRepository(PermissionActionEntity).find({
            where: {
                PermissionPageId: pageId,
                IsActive: 1
            }
        })
        for (const items of actionArr) {
            let itemArray: any = {}
            itemArray.PermissionActionId = items.Id
            itemArray.PermissionActionText = items.PermissionActionText
            itemArray.PermissionActionCode = items.PermissionActionCode
            itemArray.isChecked = false
            resPermissionArr.push(itemArray)
        }
        return resPermissionArr
    }

    async getUserPermissionArr(filter) {
        let resUserPermissionArr: any = []
        const permissionArr: any = await getRepository(UserEntity).createQueryBuilder('user')
            .leftJoinAndSelect(UserPermissionActionMappingEntity, 'upa', 'upa.UserId=user.Id')
            .leftJoinAndSelect(UserBranchMappingEntity, 'ubm', 'user.Id=ubm.UserId')
            .leftJoinAndSelect(BranchEntity, 'branch', 'branch.Id=ubm.BranchId')
            .leftJoinAndSelect(BrandEntity, 'brand', 'brand.Id=branch.BrandId')
            .select([
                'user.Id',
                'user.Username',
            ])
            .addSelect('branch.BranchName')
            .addSelect('branch.Id')
            .addSelect('brand.BrandName')
            .addSelect('upa.PermissionActionId')
            .where('user.Id = :id', { id: filter.userId })
            .andWhere('branch.Id = :id', { id: filter.branchId })
            .andWhere('user.isActived = 1')
            .getRawMany()

        for (const item of permissionArr) {
            let permissionItemArr: any = {}
            permissionItemArr.UserId = item.user_Id
            permissionItemArr.Username = item.user_Username
            permissionItemArr.PermissionActionId = item.upa_PermissionActionId
            permissionItemArr.BranchId = item.branch_Id
            permissionItemArr.BranchName = item.branch_BranchName
            permissionItemArr.BrandName = item.brand_BrandName
            resUserPermissionArr.push(permissionItemArr)
        }
        return resUserPermissionArr
    }

    async saveUserPermission(permissionArr) {

        const oldPermission: any = await this.getUserPermissionArr(permissionArr.filter)
        const userId = oldPermission[0].UserId
        const branchId = oldPermission[0].BranchId
        const newPermission = permissionArr.userPermissionArr
        let insertArray = []

        oldPermission.map(async oldItem => {
            for (let newItem of newPermission) {
                let index = newPermission.indexOf(newItem)
                if (newItem.PermissionActionId === oldItem.PermissionActionId
                    && newItem.IsChecked === true) {
                    newPermission.splice(index, 1)
                    return
                } else if (newItem.PermissionActionId === oldItem.PermissionActionId
                    && newItem.IsChecked === false) {
                    // delete userid,permissionActionId
                    const res = await this.deleteUserPermission({ PermissionActionId: newItem.PermissionActionId, UserId: userId })
                    newPermission.splice(index, 1)
                }
            }
        })
        newPermission.forEach(newItem => {
            if (newItem.IsChecked === true) {
                // insert
                let saveArr = {
                    PermissionActionId: newItem.PermissionActionId,
                    UserId: userId,
                    BranchId: branchId,
                    isActived: 1,
                }
                insertArray.push(saveArr)
            }
        })
        const result = await this.insertUserPermission(insertArray)

        return result

    }

    async deleteUserPermission(userPermission) {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            let result = await queryRunner.manager.delete(UserPermissionActionMappingEntity, userPermission)
            await queryRunner.commitTransaction()
            return true
        } catch (err) {
            await queryRunner.rollbackTransaction()
            console.log(err)
        } finally {
            await queryRunner.release()
        }
        return false
    }

    async insertUserPermission(insertArray) {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        let result: any
        try {
            if (insertArray.length > 0) {
                result = await queryRunner.manager.insert(UserPermissionActionMappingEntity, insertArray)
            }
            await queryRunner.commitTransaction()
            return true
        } catch (err) {
            await queryRunner.rollbackTransaction()
            console.log(err)
        } finally {
            await queryRunner.release()
        }

        return false
    }

    async getUserInfo(userId) {
        let whereObj: any = {}
        if (userId) {
            whereObj.Id = userId
        }

        const builder: any = await getRepository(UserEntity).createQueryBuilder('user')
            .leftJoinAndSelect(UserBranchMappingEntity, 'ubm', 'user.Id=ubm.UserId')
            .leftJoinAndSelect(BranchEntity, 'branch', 'branch.Id=ubm.BranchId')
            .leftJoinAndSelect(UserGroupMappingEntity, 'userGroupMapping', 'userGroupMapping.UserId=user.Id')
            .select([
                'user.Id',
                'user.Username',
                'user.Email',
                'user.Mobile'
            ])
            .addSelect('branch.BranchName')
            .addSelect('branch.Id')
            .addSelect('userGroupMapping.UserGroupId')
            .where(whereObj)
            .andWhere('user.isActived = 1')
            .getRawMany()
        let resUserArr: any = {}
        let branchItem: any = []
        let userGroupItem: any = []
        for (const item of builder) {
            resUserArr.UserId = item.user_Id
            resUserArr.Username = item.user_Username
            resUserArr.UserEmail = item.user_Email
            resUserArr.UserMobile = item.user_Mobile
            if (branchItem.indexOf(item.branch_Id) === -1) {
                branchItem.push(item.branch_Id)
            }
            if (userGroupItem.indexOf(item.userGroupMapping_UserGroupId) === -1) {
                userGroupItem.push(item.userGroupMapping_UserGroupId)
            }
        }
        resUserArr.branchIdArr = branchItem
        resUserArr.userGroupIdArr = userGroupItem
        return resUserArr
    }

    async getUsergroupList() {
        const userGroupArr = await getRepository(UserGroupEntity).createQueryBuilder('UserGroup')
            .select([
                'UserGroup.Id',
                'UserGroup.UserGroupText',
            ])
            .where('IsActived = 1')
            .getRawMany()
        let resUsergroup: any = []
        for (let item of userGroupArr) {
            let userItem: any = {}
            userItem.Id = item.UserGroup_Id
            userItem.UserGroupText = item.UserGroup_UserGroupText
            resUsergroup.push(userItem)
        }
        return resUsergroup
    }

    async saveUserInfo(req, userArr) {
        let updateArr: any = {}
        const currentDate = dayjs().format('YYYY-MM-DD HH:MM:ss')
        updateArr.Username = userArr.Username
        updateArr.Email = userArr.UserEmail
        updateArr.Mobile = userArr.UserMobile
        if (Number(userArr.IsActived) >= 0) {
            updateArr.IsActived = userArr.IsActived
        }
        if (Number(userArr.UserId) > 0) {
            updateArr.UpdatedBy = req.headers.username
            updateArr.UpdatedDate = convertDateToTimestampNum(currentDate)
            const resUpdateUser = await this.userService.update(userArr.UserId, updateArr)
        } else {
            updateArr.Password = crypto.createHmac('sha256', '1111').digest('hex')
            updateArr.CreatedBy = req.headers.username
            updateArr.CreatedDate = convertDateToTimestampNum(currentDate)
            const resUpdateUser = await this.insertUserInfo(updateArr)
            userArr.UserId = resUpdateUser.identifiers[0].Id
        }

        let resUserBranch = this.handleUserBranchMapping(req, userArr)
        let resUserGroup = this.handleUserGroupMapping(req, userArr)
        return resUserBranch && resUserGroup
    }

    async insertUserInfo(insertArray) {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        let result: any
        try {
            result = await queryRunner.manager.insert(UserEntity, insertArray)
            await queryRunner.commitTransaction()
            return result
        } catch (err) {
            await queryRunner.rollbackTransaction()
            console.log(err)
        } finally {
            await queryRunner.release()
        }

        return false
    }

    async handleUserGroupMapping(req, userArr) {
        const currentDate = dayjs().format('YYYY-MM-DD HH:MM:ss')
        const existGroupArr = await this.getUsergroupByUserId(userArr.UserId)
        let resFlag = true
        for (let existGroupId of existGroupArr) {
            let index = userArr.userGroupIdArr.indexOf(existGroupId)
            if (index === -1) {
                // delete
                let deleteArr = {
                    UserGroupId: existGroupId,
                    UserId: userArr.UserId,
                }
                const deleteRes = await this.deleteUserGroupMapping(deleteArr)
                resFlag = resFlag && deleteRes
            } else {
                // do nothing
                userArr.userGroupIdArr.splice(index, 1)
            }
        }
        let insertGroupArr: any = []
        userArr.userGroupIdArr.forEach(userGroupId => {
            let saveArr = {
                UserGroupId: userGroupId,
                UserId: userArr.UserId,
                IsActived: 1,
                CreatedDate: convertDateToTimestampNum(currentDate),
                CreatedBy: req.headers.username
            }
            insertGroupArr.push(saveArr)
        })
        const insertRes = await this.insertUserGroupMapping(insertGroupArr)
        resFlag = resFlag && insertRes
        return resFlag
    }

    async getUsergroupByUserId(userId) {
        const resgroupId = await getRepository(UserGroupMappingEntity).createQueryBuilder('UserGroupMapping')
            .select('UserGroupMapping.UserGroupId')
            .andWhere('UserGroupMapping.UserId = :id', { id: userId })
            .getRawMany()

        let resGroupArr: any = []
        for (let item of resgroupId) {
            resGroupArr.push(item.UserGroupMapping_UserGroupId)
        }
        return resGroupArr
    }

    async insertUserGroupMapping(insertArray) {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        let result: any
        try {
            if (insertArray.length > 0) {
                result = await queryRunner.manager.insert(UserGroupMappingEntity, insertArray)
            }
            await queryRunner.commitTransaction()
            return true
        } catch (err) {
            await queryRunner.rollbackTransaction()
            console.log(err)
        } finally {
            await queryRunner.release()
        }

        return false
    }

    async deleteUserGroupMapping(deleteArr) {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            let result = await queryRunner.manager.delete(UserGroupMappingEntity, deleteArr)
            await queryRunner.commitTransaction()
            return true
        } catch (err) {
            await queryRunner.rollbackTransaction()
            console.log(err)
        } finally {
            await queryRunner.release()
        }
        return false
    }

    async handleUserBranchMapping(req, userArr) {
        const currentDate = dayjs().format('YYYY-MM-DD HH:MM:ss')
        const existBranchArr = await this.getBranchIdByUser(userArr.UserId)
        let resFlag = true
        for (let existBranchId of existBranchArr) {
            let index = userArr.branchIdArr.indexOf(existBranchId)
            if (index === -1) {
                // delete
                let deleteArr = {
                    BranchId: existBranchId,
                    UserId: userArr.UserId,
                }
                const deleteRes = await this.deleteUserBranchMapping(deleteArr)
                resFlag = resFlag && deleteRes
            } else {
                // do nothing
                userArr.branchIdArr.splice(index, 1)
            }
        }
        let insertBranchArr: any = []
        userArr.branchIdArr.forEach(branchId => {
            let saveArr = {
                BranchId: branchId,
                UserId: userArr.UserId,
                IsActived: 1,
                CreatedDate: convertDateToTimestampNum(currentDate),
                CreatedBy: req.headers.username
            }
            insertBranchArr.push(saveArr)
        })
        const insertRes = await this.insertUserBranchMapping(insertBranchArr)
        resFlag = resFlag && insertRes
        return resFlag
    }

    async getBranchIdByUser(userId) {
        const resBranchId = await getRepository(UserBranchMappingEntity).createQueryBuilder('UserBranchMapping')
            .select('UserBranchMapping.BranchId')
            .andWhere('UserBranchMapping.UserId=:id', { id: userId })
            .getRawMany()

        let resbranchArr: any = []
        for (let item of resBranchId) {
            resbranchArr.push(item.UserBranchMapping_BranchId)
        }
        return resbranchArr
    }

    async insertUserBranchMapping(insertArray) {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        let result: any
        try {
            if (insertArray.length > 0) {
                result = await queryRunner.manager.insert(UserBranchMappingEntity, insertArray)
            }
            await queryRunner.commitTransaction()
            return true
        } catch (err) {
            await queryRunner.rollbackTransaction()
            console.log(err)
        } finally {
            await queryRunner.release()
        }

        return false
    }

    async deleteUserBranchMapping(deleteArr) {
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            let result = await queryRunner.manager.delete(UserBranchMappingEntity, deleteArr)
            await queryRunner.commitTransaction()
            return true
        } catch (err) {
            await queryRunner.rollbackTransaction()
            console.log(err)
        } finally {
            await queryRunner.release()
        }
        return false
    }

}



