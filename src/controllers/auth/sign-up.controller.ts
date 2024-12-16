import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('sign-up')
export class SignUpController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async signUp(@Body() body: any) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User already exists')
    }

    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }
}
