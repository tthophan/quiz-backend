import { Expose, Type } from 'class-transformer';
import { QuestionResponse } from './question-response.model';

export class QuizResponse {
  @Expose()
  code: string;
  @Expose()
  id: string;
  @Expose()
  shortDescription: string;
  @Expose()
  title: string;

  @Expose()
  totalQuestions: number;

  @Type(() => QuestionResponse)
  @Expose()
  questions: Array<QuestionResponse>;
}
