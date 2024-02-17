import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber } from 'class-validator';

export class AnswerQuestion {
  @IsNumber()
  quizId: number;

  @IsNumber()
  questionId: number;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  optionIds: Array<number>;
}
