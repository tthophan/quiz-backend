import { Injectable } from '@nestjs/common'
import { BaseRepository } from '~/common/bases'

@Injectable()
export class QuizRepository extends BaseRepository {
    create = this.client.quiz.create
    update = this.client.quiz.update
    delete = this.client.quiz.delete
    upsert = this.client.quiz.upsert
    createMany = this.client.quiz.createMany
    deleteMany = this.client.quiz.deleteMany
    updateMany = this.client.quiz.updateMany
}
