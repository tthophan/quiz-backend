import { Injectable } from '@nestjs/common';
import { BaseRepository } from '~/common/bases';

@Injectable()
export class UserRepository extends BaseRepository {
  create = this.client.user.create;
  update = this.client.user.update;
  delete = this.client.user.delete;
  upsert = this.client.user.upsert;
  createMany = this.client.user.createMany;
  deleteMany = this.client.user.deleteMany;
  updateMany = this.client.user.updateMany;
}
