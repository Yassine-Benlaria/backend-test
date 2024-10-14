import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseException, BaseExceptionCause } from './base-exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error('exception', exception);

    const cxt = host.switchToHttp();
    const response = cxt.getResponse();
    const request = cxt.getRequest();

    const [status, message, statusCode] = mapExceptionToHttpStatus(exception);

    const responseBody = {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
      code: statusCode,
    };

    response.status(status).json(responseBody);
  }
}

export function mapExceptionToHttpStatus(
  exception,
): [HttpStatus, string, string] {
  if (exception instanceof HttpException) {
    return [exception.getStatus(), exception.message, ''];
  }

  if (exception instanceof BaseException) {
    const cause = exception.cause;
    switch (cause) {
      case BaseExceptionCause.NOT_FOUND:
        return [HttpStatus.NOT_FOUND, exception.message, exception.statusCode];
      case BaseExceptionCause.ALREADY_EXISTS:
        return [HttpStatus.CONFLICT, exception.message, exception.statusCode];
      case BaseExceptionCause.UNAUTHORIZED:
        return [
          HttpStatus.UNAUTHORIZED,
          exception.message,
          exception.statusCode,
        ];
      case BaseExceptionCause.UNKNOW:
        return [
          HttpStatus.INTERNAL_SERVER_ERROR,
          exception.message,
          exception.statusCode,
        ];
      default:
        return [
          HttpStatus.INTERNAL_SERVER_ERROR,
          exception.message,
          exception.statusCode,
        ];
    }
  }

  if (exception instanceof Error) {
    return [HttpStatus.INTERNAL_SERVER_ERROR, exception.message, ''];
  }

  return [HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error', ''];
}
