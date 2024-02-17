import { Injectable } from '@nestjs/common';
import { BaseRepository } from '~/common/bases';

@Injectable()
export class OptionRepository extends BaseRepository {
  create = this.client.option.create;
  update = this.client.option.update;
  delete = this.client.option.delete;
  upsert = this.client.option.upsert;
  createMany = this.client.option.createMany;
  deleteMany = this.client.option.deleteMany;
  updateMany = this.client.option.updateMany;
}
