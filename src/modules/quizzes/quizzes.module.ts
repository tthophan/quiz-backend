import { Module } from '@nestjs/common';
import { QuizzesController } from './controllers';
import { QuizService } from './services';

@Module({
  imports: [],
  controllers: [QuizzesController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizzesModule {}
