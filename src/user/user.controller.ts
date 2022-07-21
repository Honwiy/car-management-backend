import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common'
import { Request } from 'express'
import { UserService } from './user.service'
import { UserEntity } from './entity/user.entity'
import { UserRO, UserInfoRO } from './user.interface'
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { User } from './user.decorator'
import { ValidationPipe } from '../common/pipes/validation.pipe'

import {
  ApiUseTags,
  ApiBearerAuth
} from '@nestjs/swagger'

@ApiBearerAuth()
@ApiUseTags('user')
@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  // TODO: find user by email/name/phone
  // @Get('user')
  // async findMe(@User('Email') Email: string): Promise<UserRO> {
  //   return await this.userService.findByEmail(Email)
  // }

  @Put('user')
  async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
    return await this.userService.update(userId, userData)
  }

  // TODO: update create function
  // @UsePipes(new ValidationPipe())
  // @Post('users')
  // async create(@Body('user') userData: CreateUserDto) {
  //   return this.userService.create(userData)
  // }

  @Delete('users/:slug')
  async delete(@Param() params) {
    return await this.userService.delete(params.slug)
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserInfoRO> {
    const _user = await this.userService.findOne(loginUserDto)

    if (!_user) {
      throw new HttpException('用户名或密码错误，请重新输入', 401)
    }

    const token = await this.userService.generateJWT(_user)
    const { user, organizations, userGroup } = _user
    const userRes = { user, token, organizations, userGroup }
    return userRes
    // TODO: final model is UserRO
    // return { user, userGroup, department, branch, brand}
  }
}
