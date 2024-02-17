import { Injectable } from '@nestjs/common'
import { BaseRepository } from '~/common/bases'

@Injectable()
export class QuestionQueries extends BaseRepository {
    find = this.client.question.findMany
    findOne = this.client.question.findFirst
    findUnique = this.client.question.findUnique
    count = this.client.question.count
    groupBy = this.client.question.groupBy
}
