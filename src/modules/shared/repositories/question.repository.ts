import { Injectable } from '@nestjs/common'
import { BaseRepository } from '~/common/bases'

@Injectable()
export class QuestionRepository extends BaseRepository {
    create = this.client.question.create
    update = this.client.question.update
    delete = this.client.question.delete
    upsert = this.client.question.upsert
    createMany = this.client.question.createMany
    deleteMany = this.client.question.deleteMany
    updateMany = this.client.question.updateMany
}
