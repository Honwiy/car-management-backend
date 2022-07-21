import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { WebsocketGateway } from './websocket.gateway'

@Module({
  providers: [WebsocketGateway],
})
export class WebsocketModule {

}
