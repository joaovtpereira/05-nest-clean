import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationSchema = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class GetPostsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getPosts(
    @Query('page', queryValidationSchema) page: PageQueryParamSchema,
  ) {
    const perPage = 20

    const posts = await this.prisma.post.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      posts,
    }
  }
}
