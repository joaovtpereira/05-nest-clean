import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { SignUpController } from './controllers/auth/sign-up.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { SessionController } from './controllers/auth/sessions.controller'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [SignUpController, SessionController],
  providers: [PrismaService],
})
export class AppModule {}
