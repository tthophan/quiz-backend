import { Injectable } from '@nestjs/common';
import { BaseRepository } from '~/common/bases';

@Injectable()
export class ResultRepository extends BaseRepository {
  create = this.client.result.create;
  update = this.client.result.update;
  delete = this.client.result.delete;
  upsert = this.client.result.upsert;
  createMany = this.client.result.createMany;
  deleteMany = this.client.result.deleteMany;
  updateMany = this.client.result.updateMany;
}
