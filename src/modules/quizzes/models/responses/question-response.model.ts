import { Expose, Type } from 'class-transformer';
import { OptionResponse } from './option-response.model';

export class QuestionResponse {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  hint: string;
  @Expose()
  text: string;

  @Type(() => OptionResponse)
  @Expose()
  options: Array<OptionResponse>;
}
