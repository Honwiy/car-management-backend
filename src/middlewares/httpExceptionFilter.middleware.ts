import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

// @Catch() // 捕获所有异常
// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp()
//     const response = ctx.getResponse<Response>()
//     const request = ctx.getRequest<Request>()
//     const status = exception.getStatus()

//     console.log('%s %s error: %s', request.method, request.url, exception.message)
//     // 发送响应
//     response
//       .status(status)
//       .json({
//         statusCode: status,
//         message: exception.message,
//         path: request.url,
//       })
//   }
// }

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
