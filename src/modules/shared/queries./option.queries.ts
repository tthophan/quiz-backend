import { Injectable } from '@nestjs/common'
import { BaseRepository } from '~/common/bases'

@Injectable()
export class OptionQueries extends BaseRepository {
    find = this.client.option.findMany
    findOne = this.client.option.findFirst
    findUnique = this.client.option.findUnique
}
