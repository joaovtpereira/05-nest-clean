import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { SignUpController } from './controllers/auth/sign-up.controller'

@Module({
  imports: [],
  controllers: [SignUpController],
  providers: [PrismaService],
})
export class AppModule {}
