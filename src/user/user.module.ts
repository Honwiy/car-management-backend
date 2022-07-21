import { UserGroupMappingEntity } from './entity/user-group-mapping.entity'
import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entity/user.entity'
import { UserGroupEntity } from './entity/user-group.entity'
import { UserService } from './user.service'
import { AuthMiddleware } from './auth.middleware'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserGroupEntity, UserGroupMappingEntity])],
  providers: [UserService],
  controllers: [
    UserController,
  ],
  exports: [UserService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'user', method: RequestMethod.GET}, {path: 'user', method: RequestMethod.PUT})
  }
}
