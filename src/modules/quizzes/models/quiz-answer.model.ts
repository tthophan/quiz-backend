import { Type } from "class-transformer"
import { ArrayMinSize, ArrayUnique, IsArray, IsNumber, ValidateNested } from "class-validator"

export class OptionResult {
    @IsNumber()
    questionId: number

    @IsArray()
    @ArrayUnique()
    optionIds: Array<number>
}

export class QuizAnswer {
    @IsNumber()
    id: number

    @IsArray()
    @ArrayMinSize(1)
    @Type(() => OptionResult)
    @ValidateNested()
    @ArrayUnique<OptionResult>(i => i.optionIds)
    optionResults: Array<OptionResult>
}
