import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createPostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  slug: z.string(),
  category: z.string(),
  authorId: z.string().uuid(),
})

type PostBodySchema = z.infer<typeof createPostBodySchema>

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPostBodySchema))
  async post(@Body() body: PostBodySchema) {
    const { title, content, slug, category, authorId } = body

    return this.prisma.post.create({
      data: {
        title,
        content,
        slug,
        category,
        authorId,
      },
    })
  }
}
