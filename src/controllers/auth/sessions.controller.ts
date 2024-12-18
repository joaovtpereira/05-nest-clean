import { Body, Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { z } from 'zod'

const createSessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SessionBodySchema = z.infer<typeof createSessionBodySchema>

@Controller('session')
export class SessionController {
  constructor(private jwt: JwtService) {}

  @Post()
  //   @HttpCode(201)
  //   @UsePipes(new ZodValidationPipe(createSessionBodySchema))
  async session(@Body() body: SessionBodySchema) {
    const { email, password } = body

    console.log({ email, password })

    const token = this.jwt.sign({ sub: 'user-id' })

    return token
  }
}
