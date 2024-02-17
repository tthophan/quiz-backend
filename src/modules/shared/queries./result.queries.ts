import { Injectable } from '@nestjs/common'
import { BaseRepository } from '~/common/bases'

@Injectable()
export class ResultQueries extends BaseRepository {
    find = this.client.result.findMany
    findOne = this.client.result.findFirst
    findUnique = this.client.result.findUnique
}
