import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BaseService } from '~/common/bases';
import {
  BusinessException,
  ConflictException,
  NotFoundException,
} from '~/common/exception';
import { ResultRepository } from '~/modules/shared';
import {
  OptionQueries,
  QuestionQueries,
  QuizQueries,
  ResultQueries,
} from '~/modules/shared/queries.';
import { AnswerQuestion, QuizAnswer } from '../models';
import { AnswerQuestionResponse, QuizResponse } from '../models/responses';

@Injectable()
export class QuizService extends BaseService {
  constructor(
    private readonly quizQueries: QuizQueries,
    private readonly questionQueries: QuestionQueries,
    private readonly optionQueries: OptionQueries,
    private readonly resultQueries: ResultQueries,
    private readonly resultRepository: ResultRepository,
  ) {
    super();
  }
  async pagination(page: number = 1, pageSize: number = 10) {
    const pagination = await this.quizQueries.paginated(page, pageSize);
    if (!this.currentSession) return pagination;
    const quizHasSubmitted = await this.resultQueries.find({
      where: {
        userId: this.currentSession.userId,
        quizId: {
          in: pagination.items.map(({ id }) => id),
        },
      },
    });
    const totalQuestions = await this.questionQueries.groupBy({
      by: ['quizId'],
      _count: true,
    });
    const counts: Record<number, number> = {};
    totalQuestions?.forEach((group) => {
      counts[group.quizId] = group._count;
    });

    const quizSubmitted: Record<number, boolean> = {};
    quizHasSubmitted.forEach((result) => {
      quizSubmitted[result.quizId] = true;
    });
    return {
      ...pagination,
      items: plainToInstance(
        QuizResponse,
        pagination.items.map((i) => ({
          ...i,
          isAnswered: quizSubmitted[i.id],
          totalQuestions: counts[i.id],
        })),
      ),
    };
  }

  async detail(code: string): Promise<QuizResponse> {
    const quiz = await this.quizQueries.findUnique({
      where: {
        code,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) throw new NotFoundException();
    return plainToInstance(QuizResponse, quiz, {
      excludeExtraneousValues: true,
    });
  }

  async vaniQuizDetail(): Promise<QuizResponse> {
    return this.detail('vani-quiz');
  }

  async vaniQuizCheck(): Promise<boolean> {
    return await this.checkQuizAnswered('vani-quiz', this.currentSession.userId);
  }

  async submitQuiz(payload: QuizAnswer) {
    const quiz = await this.quizQueries.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!quiz) throw new BusinessException('QUIZ_NOT_FOUND');

    const checkResult = await this.resultQueries.findOne({
      where: {
        userId: this.currentSession.userId,
        quizId: quiz.id,
      },
    });
    if (checkResult) throw new ConflictException();

    const questionIds = payload.optionResults.map(
      ({ questionId }) => questionId,
    );
    const questions = await this.questionQueries.find({
      where: {
        quizId: quiz.id,
        id: {
          in: questionIds,
        },
      },
    });
    if (questions?.length !== payload.optionResults.length)
      throw new BusinessException('INVALID_DATA');

    const conditions = payload.optionResults.map(
      ({ optionIds, questionId }) => ({
        id: {
          in: optionIds,
        },
        quizId: quiz.id,
        questionId: questionId,
      }),
    );
    const options = await this.optionQueries.find({
      where: {
        OR: conditions,
      },
    });
    if (options?.length !== conditions.flatMap(({ id }) => id.in).length)
      throw new BusinessException('INVALID_DATA');

    await this.resultRepository.createMany({
      data: payload.optionResults.flatMap((question) =>
        question.optionIds.map((optionId) => ({
          optionId: optionId,
          questionId: question.questionId,
          quizId: quiz.id,
          userId: this.currentSession.userId,
        })),
      ),
    });
  }

  async checkQuizAnswered(quizCode: string, userId: string) {
    const quiz = await this.quizQueries.findUnique({
      where: {
        code: quizCode
      }
    });
    if (!quiz) throw new BusinessException('QUIZ_NOT_FOUND')

    const { id: quizId } = quiz
    const totalQuestion = await this.questionQueries.count({
      where: {
        quizId: quizId,
      },
    });

    const totalResult = await this.resultQueries.count({
      where: {
        userId: userId,
        quizId: quizId,
      },
    });
    return (totalResult === totalQuestion)
  }

  async answerQuestion(
    payload: AnswerQuestion,
  ): Promise<AnswerQuestionResponse> {
    const { quizId, questionId, optionIds } = payload;
    const quiz = await this.quizQueries.findOne({
      where: {
        id: quizId
      }
    })
    if (!quiz) throw new BusinessException('QUIZ_NOT_FOUND')

    const question = await this.questionQueries.findUnique({
      where: {
        id: questionId,
        quizId,
      },
    });
    if (!question) throw new BusinessException('INVALID_DATA');

    const result = await this.resultQueries.findOne({
      where: {
        quizId: quiz.id,
        questionId: question.id
      }
    })
    if (result)
      throw new BusinessException('QUIZ_ANSWERED');

    if (optionIds.length !== question.maxOptionCanSelected)
      throw new BusinessException('INVALID_DATA');

    const options = await this.optionQueries.find({
      where: {
        questionId: question.id,
      },
    });
    const selectedOptions = options.filter((o) => optionIds.includes(o.id));
    if (selectedOptions.length !== optionIds.length)
      throw new BusinessException('INVALID_DATA');

    const isMatch =
      selectedOptions.filter((x) => x.match).length ===
      question.maxOptionCanSelected;
    if (isMatch)
      await this.resultRepository.createMany({
        data: selectedOptions.map((option) => ({
          userId: this.currentSession.userId,
          questionId: option.questionId,
          optionId: option.id,
          quizId: quizId,
          result: true,
        })),
      });

    return plainToInstance(AnswerQuestionResponse, {
      result: isMatch,
      hint: question.hint
    });
  }
}
