import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BaseController } from '~/common/bases';
import { Authorize } from '~/modules/auth/decorators/auth.decorator';
import { AnswerQuestion, QuizAnswer, QuizzesQueryParams } from '../models';
import { QuizService } from '../services/quiz.service';

@Controller('quizzes')
export class QuizzesController extends BaseController {
  constructor(private readonly quizService: QuizService) {
    super();
  }

  @Authorize()
  @Get()
  async pagination(@Query() query: QuizzesQueryParams) {
    return await this.quizService.pagination(query.page, query.pageSize);
  }

  @Authorize()
  @Get(':code')
  async detail(@Param('code') code: string) {
    return this.quizService.detail(code);
  }

  @Authorize()
  @Get('vani-quiz/detail')
  async vaniQuiz() {
    return this.quizService.vaniQuizDetail();
  }

  @Authorize()
  @Post()
  async submit(@Body() payload: QuizAnswer) {
    await this.quizService.submitQuiz(payload);
  }

  @Authorize()
  @Get('answer/check')
  async checkVaniQuizAnswered() {
    return await this.quizService.vaniQuizCheck();
  }

  @Authorize()
  @Post('answer-question')
  async answerQuestion(@Body() payload: AnswerQuestion) {
    return await this.quizService.answerQuestion(payload);
  }
}
