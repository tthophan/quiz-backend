import { Injectable } from '@nestjs/common';
import { BaseRepository } from '~/common/bases';

@Injectable()
export class UserQueries extends BaseRepository {
  find = this.client.user.findMany;
  findOne = this.client.user.findFirst;
  findUnique = this.client.user.findUnique;
}
