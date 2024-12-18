import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-auth.decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createPostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  slug: z.string(),
  category: z.string(),
})

const sessionPipeSchema = new ZodValidationPipe(createPostBodySchema)

type PostBodySchema = z.infer<typeof createPostBodySchema>

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async post(
    @Body(sessionPipeSchema) body: PostBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, slug, category } = body
    const userId = user.sub

    return this.prisma.post.create({
      data: {
        title,
        content,
        slug,
        category,
        authorId: userId,
      },
    })
  }
}
