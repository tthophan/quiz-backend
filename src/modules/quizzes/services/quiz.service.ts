import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { BaseService } from "~/common/bases";
import { BusinessException, ConflictException, NotFoundException } from "~/common/exception";
import { ResultRepository } from "~/modules/shared";
import { OptionQueries, QuestionQueries, QuizQueries, ResultQueries } from "~/modules/shared/queries.";
import { AnswerQuestion, QuizAnswer } from "../models";
import { AnswerQuestionResponse, QuizResponse } from "../models/responses";

@Injectable()
export class QuizService extends BaseService {
    constructor(
        private readonly quizQueries: QuizQueries,
        private readonly questionQueries: QuestionQueries,
        private readonly optionQueries: OptionQueries,
        private readonly resultQueries: ResultQueries,
        private readonly resultRepository: ResultRepository
    ) {
        super()
    }
    async pagination(
        page: number = 1,
        pageSize: number = 10,
    ) {
        const pagination = await this.quizQueries.paginated(page, pageSize);
        if (!this.currentSession) return pagination;
        const quizHasSubmitted = await this.resultQueries.find({
            where: {
                userId: this.currentSession.userId,
                quizId: {
                    in: pagination.items.map(({ id }) => id)
                }
            }
        })
        const totalQuestions = await this.questionQueries.groupBy({
            by: ['quizId'],
            _count: true
        })
        const counts: Record<number, number> = {}
        totalQuestions?.forEach((group) => {
            counts[group.quizId] = group._count
        })

        const quizSubmitted: Record<number, boolean> = {}
        quizHasSubmitted.forEach((result) => {
            quizSubmitted[result.quizId] = true
        });
        return {
            ...pagination,
            items: plainToInstance(QuizResponse, pagination.items.map((i) => ({
                ...i,
                isAnswered: quizSubmitted[i.id],
                totalQuestions: counts[i.id]
            })))
        }
    }

    async detail(code: string): Promise<QuizResponse> {
        const quiz = await this.quizQueries.findUnique({
            where: {
                code
            },
            include: {
                questions: {
                    include: {
                        options: true
                    },
                }
            }
        });
        if (!quiz) throw new NotFoundException()
        return plainToInstance(QuizResponse, quiz, { excludeExtraneousValues: true })
    }

    async submitQuiz(payload: QuizAnswer) {
        const quiz = await this.quizQueries.findUnique({
            where: {
                id: payload.id
            }
        })
        if (!quiz) throw new BusinessException('QUIZ_NOT_FOUND');

        const checkResult = await this.resultQueries.findOne({
            where: {
                userId: this.currentSession.userId,
                quizId: quiz.id
            }
        })
        if (checkResult) throw new ConflictException()

        const questionIds = payload.optionResults.map(({ questionId }) => questionId)
        const questions = await this.questionQueries.find({
            where: {
                quizId: quiz.id,
                id: {
                    in: questionIds
                }
            }
        });
        if (questions?.length !== payload.optionResults.length)
            throw new BusinessException('INVALID_DATA')

        const conditions = payload.optionResults.map(({ optionIds, questionId }) => ({
            id: {
                in: optionIds,
            },
            quizId: quiz.id,
            questionId: questionId
        }
        ))
        const options = await this.optionQueries.find({
            where: {
                OR: conditions
            }
        })
        if (options?.length !== conditions.flatMap(({ id }) => id.in).length)
            throw new BusinessException('INVALID_DATA')

        await this.resultRepository.createMany({
            data: payload.optionResults.flatMap((question) => (
                question.optionIds.map((optionId) => ({
                    optionId: optionId,
                    questionId: question.questionId,
                    quizId: quiz.id,
                    userId: this.currentSession.userId
                }))
            ))
        })
    }

    async answerQuestion(payload: AnswerQuestion): Promise<AnswerQuestionResponse> {
        const { quizId, questionId, optionId } = payload
        const question = await this.questionQueries.findUnique({
            where: {
                id: questionId,
                quizId,
            },
        });
        if (!question) throw new BusinessException('INVALID_DATA');

        const options = await this.optionQueries.find({
            where: {
                questionId: question.id,
            },
        });
        const optionSelected = options.find((o) => o.id === optionId)
        if (!optionSelected)
            throw new BusinessException('INVALID_DATA');

        await this.resultRepository.create({
            data: {
                userId: this.currentSession.userId,
                questionId: optionSelected.questionId,
                optionId: optionSelected.id,
                quizId: quizId
            }
        })

        return plainToInstance(AnswerQuestionResponse, {
            result: optionSelected.match,
            detail: options.find((o) => o.match)
        })
    }
}
