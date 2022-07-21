import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AllExceptionsFilter } from './middlewares/httpExceptionFilter.middleware'
// import { WsAdapter } from '@nestjs/platform-ws'

async function bootstrap() {
  const appOptions = {cors: true}
  const app = await NestFactory.create(ApplicationModule, appOptions)
  app.useGlobalFilters(new AllExceptionsFilter())
  app.setGlobalPrefix('api')

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document)
  // app.useWebSocketAdapter(new WsAdapter(app))
  // console.log('app-------------', app)
  await app.listen(3000)
}
bootstrap()
