import { Exclude, Expose } from 'class-transformer';

export class OptionResponse {
  @Expose()
  id: number;
  @Expose()
  code: string;
  @Expose()
  text: string;
  @Exclude()
  match: boolean;
}
