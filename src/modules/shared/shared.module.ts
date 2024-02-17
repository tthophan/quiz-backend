import { Global, Module } from '@nestjs/common';
import {
  OptionQueries,
  QuestionQueries,
  QuizQueries,
  ResultQueries,
  UserQueries,
} from './queries.';
import {
  OptionRepository,
  QuestionRepository,
  QuizRepository,
  ResultRepository,
  UserRepository,
} from './repositories';

@Global()
@Module({
  exports: [
    QuizQueries,
    QuizRepository,
    QuestionQueries,
    QuestionRepository,
    OptionQueries,
    OptionRepository,
    ResultQueries,
    ResultRepository,
    UserQueries,
    UserRepository,
  ],
  providers: [
    QuizQueries,
    QuizRepository,
    QuestionQueries,
    QuestionRepository,
    OptionQueries,
    OptionRepository,
    ResultQueries,
    ResultRepository,
    UserQueries,
    UserRepository,
  ],
})
export class SharedModule {}
