import { Expose, Type } from "class-transformer"
import { OptionResponse } from "./option-response.model"

export class AnswerQuestionResponse {
    @Expose()
    result: boolean

    @Type(() => OptionResponse)
    @Expose()
    detail: OptionResponse
}
