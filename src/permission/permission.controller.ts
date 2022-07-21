import { UserList, UserListRO } from './permission.interface'
import { PermissionSearchFilter } from './../permission/permission.interface'
import { PermissionService } from './permission.service'
import { Body, Controller, Inject, Post, Get, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('permission')
export class PermissionController {
    constructor(
        @Inject('PermissionService') private permissionService: PermissionService
    ) {}

    @Post('searchUser')
    async getUserList(@Body('filter') filter: PermissionSearchFilter): Promise<UserListRO> {
        return await this.permissionService.searchUser(filter)
        // http://localhost:3000/api/permission/searchUser
    }

    @Get('getBranchList')
    async getBranchList(): Promise<Array<any>> {
        return await this.permissionService.getBranchList()
    }

    @Get('getUsergroupList')
    async getUsergroupList(): Promise<Array<any>> {
        return await this.permissionService.getUsergroupList()
    }

    // getPermissionSectionArr
    @Get('getPermissionSectionArr')
    async getPermissionSectionArr(): Promise<Array<any>> {
        return await this.permissionService.getPermissionSectionArr()
    }

    // getUserPermissionArr
    @Post('getUserPermissionArr')
    async getUserPermissionArr(@Body('filter') filter: any): Promise<Array<any>> {
        return await this.permissionService.getUserPermissionArr(filter)
    }

    @Post('saveUserPermission')
    async saveUserPermission(@Body('permissionArr') permissionArr: any): Promise<any> {
        return await this.permissionService.saveUserPermission(permissionArr)
    }

    @Post('getUserInfo')
    async getUserInfo(@Body('userId') userId: any): Promise<Array<any>> {
        return await this.permissionService.getUserInfo(userId)
    }

    @Post('saveUserInfo')
    async saveUserInfo(@Req() req: Request, @Body('userArr') userArr: any): Promise<any> {
        return await this.permissionService.saveUserInfo(req, userArr)
    }



}
