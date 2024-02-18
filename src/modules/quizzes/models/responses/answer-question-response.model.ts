import { Expose } from 'class-transformer';

export class AnswerQuestionResponse {
  @Expose()
  result: boolean;
}
