import { HttpException, HttpStatus } from '@nestjs/common'
import { ExceptionType } from '../constants'

export class BusinessException extends HttpException {
  constructor(errorCode: ExceptionType | Record<string, unknown>) {
    super(errorCode, HttpStatus.BAD_REQUEST)
  }
}

export class UnauthorizedException extends HttpException {
  constructor() {
    super('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
  }
}

export class ForbiddenException extends HttpException {
  constructor() {
    super('ACCESS_DENIED', HttpStatus.FORBIDDEN)
  }
}
export class NotFoundException extends HttpException {
  constructor() {
    super('NOT_FOUND', HttpStatus.NOT_FOUND)
  }
}

export class ConflictException extends HttpException {
  constructor() {
    super('CONFLICT', HttpStatus.CONFLICT)
  }
}
