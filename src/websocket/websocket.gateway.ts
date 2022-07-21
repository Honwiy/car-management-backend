import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server, Socket } from 'socket.io'

@WebSocketGateway(3001, { namespace: 'api/websocket' })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('sendMessage')
  handleEvent(socket: Socket, data: string) {
    socket.emit('sendMessage', data)
    return 'test'
    // return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })))
  }

  @SubscribeMessage('receiveMessage')
  async identity(socket: Socket, data: any) {
    socket.broadcast.emit('receiveMessage', data)
  }

  @SubscribeMessage('connection')
  async testConnection(socket: Socket) {
    {
      console.log('connect successfully')
      socket.on('disconnect', () => {
      })

      socket.emit('event', 'ping')

      socket.on('event', (data: any) => {
        // socket.emit('event', 'ping')
      })

    }
  }
}
