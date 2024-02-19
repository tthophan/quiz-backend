import { Expose, Type } from 'class-transformer';
import { OptionResponse } from './option-response.model';

export class QuestionResponse {
  @Expose()
  id: number;
  @Expose()
  code: string;
  // @Expose()
  // hint: string;
  @Expose()
  text: string;
  @Expose()
  maxOptionCanSelected: number;
  @Type(() => OptionResponse)
  @Expose()
  options: Array<OptionResponse>;
}
