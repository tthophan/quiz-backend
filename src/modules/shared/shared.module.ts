import { Global, Module } from "@nestjs/common";
import { OptionQueries, QuestionQueries, QuizQueries, ResultQueries } from "./queries.";
import { OptionRepository, QuestionRepository, QuizRepository, ResultRepository } from "./repositories";

@Global()
@Module({
    exports: [QuizQueries, QuizRepository, QuestionQueries, QuestionRepository, OptionQueries, OptionRepository, ResultQueries, ResultRepository,],
    providers: [QuizQueries, QuizRepository, QuestionQueries, QuestionRepository, OptionQueries, OptionRepository, ResultQueries, ResultRepository,],
})
export class SharedModule { }