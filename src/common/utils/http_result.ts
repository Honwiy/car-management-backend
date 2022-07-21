import { Response, Request } from 'express'

export function fail(res: Response, err: any) {
  return res.status(500).send(err)
}

export function success(data?: any) {
  const message = {
    isSuccess: true,
    data
  }
  return message
}
