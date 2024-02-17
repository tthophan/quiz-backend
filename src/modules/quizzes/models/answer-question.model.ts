import { IsNumber } from "class-validator"

export class AnswerQuestion {
    @IsNumber()
    quizId: number

    @IsNumber()
    questionId: number

    @IsNumber()
    optionId: number
}
