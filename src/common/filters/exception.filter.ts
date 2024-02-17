import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { isArray } from 'lodash'
import { ExceptionType } from '../constants'
import { ErrorResponse, WarningResponse } from '../models'

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private readonly logger: Logger = new Logger(ExceptionsFilter.name)
  catch(exception: unknown, host: ArgumentsHost) {
    let customException = exception
    const httpAdapter = this.httpAdapterHost?.httpAdapter

    // NotFoundError
    if (
      exception instanceof PrismaClientKnownRequestError &&
      exception.code === 'P2025'
    ) {
      customException = new HttpException(
        new ErrorResponse('INVALID_DATA'),
        HttpStatus.NOT_FOUND,
      )
      super.catch(customException, host)
    }
    //Exception that belong to HttpException
    else if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const res = exception.getResponse() as
        | {
          data?: unknown
          statusCode: number
          message: string | string[]
          error: string
        }
        | string

      if (typeof res === 'object' && isArray(res.message)) {
        const { message } = res
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const customMessage: Record<string, any>[] = []
        for (const m of message) {
          const index = m.indexOf(' ')
          const key = m.substring(0, index)
          customMessage.push({ field: key, message: m })
        }
        customException = new HttpException(
          new ErrorResponse('INVALID_DATA', customMessage),
          status,
        )
      }

      if (typeof res === 'object' && typeof res.message === 'string') {
        const { message } = res
        // for this case warning business
        if (status === HttpStatus.OK) {
          customException = new HttpException(
            new WarningResponse(res.data, message as ExceptionType),
            status,
          )
        } else {
          customException = new HttpException(
            new ErrorResponse(message as ExceptionType),
            status,
          )
        }
      }

      if (typeof res === 'string') {
        customException = new HttpException(
          new ErrorResponse(res as ExceptionType),
          status,
        )
      }

      super.catch(customException, host)
    }
    //Other exception that unknown
    else {
      this.logger.error(exception)
      httpAdapter?.reply(
        host.switchToHttp().getResponse(),
        new ErrorResponse(
          'INTERNAL_SERVER',
          JSON.parse(
            // JSON.stringify(exception, Object.getOwnPropertyNames(exception)),
            JSON.stringify(exception),
          ),
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
