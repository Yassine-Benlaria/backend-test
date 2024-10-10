export enum BaseExceptionCause {
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNKNOW = 'UNKNOW',
}

export class BaseException {
  cause: BaseExceptionCause;
  message: string;
  statusCode: string;

  constructor(
    cause: BaseExceptionCause,
    message?: string,
    statusCode?: string,
  ) {
    this.cause = cause;
    this.message = message || this.cause;
    this.statusCode = statusCode;
  }
}
