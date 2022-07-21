import { UserModule } from './../user/user.module';
import { Module, NestModule, MiddlewareConsumer, RequestMethod, Post } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { PermissionPageEntity } from './entity/permission-page.entity'
import { PermissionActionEntity } from './entity/permission-action.entity'
import { PermissionSectionEntity } from './entity/permission-section.entity'
import { UserEntity } from './../user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PermissionPageEntity, PermissionActionEntity, PermissionSectionEntity])
    , UserModule
  ],
  providers: [PermissionService],
  controllers: [
    PermissionController,
  ],
  exports: [PermissionService],
})
export class PermissionModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
    .apply()
    .forRoutes(
      { path: 'permission/searchUser', method: RequestMethod.POST },
    )
  }
}
