import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '~/common/bases';
import { Pagination } from '~/common/models';

@Injectable()
export class QuizQueries extends BaseRepository {
  find = this.client.quiz.findMany;
  findOne = this.client.quiz.findFirst;
  findUnique = this.client.quiz.findUnique;
  paginated = async (
    page: number = 1,
    pageSize: number = 10,
    where?: Prisma.QuizWhereInput,
  ) => {
    const skip = (page - 1) * pageSize;
    const items = await this.find({
      where,
      skip,
      take: pageSize,
    });
    const total = await this.client.quiz.count({
      where,
    });
    return new Pagination({
      items,
      page,
      pageSize,
      total,
    });
  };
}
