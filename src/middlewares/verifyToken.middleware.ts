import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import * as decode from 'jwt-decode'

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // console.log('Token Information', req.headers.authorization)
    if (!req.headers.authorization) {
      return
    }
    const bearerToken = req.headers.authorization.replace('Bearer ', '')
    const { Username, Email, Mobile } = decode(bearerToken)
    req.headers.email = Email
    req.headers.username = Username
    next()
  }
}
