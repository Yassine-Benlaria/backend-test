import {
  BaseException,
  BaseExceptionCause,
} from '../../shared/exceptions/base-exception';

export class UserNotFoundException extends BaseException {
  constructor(message?: string) {
    super(BaseExceptionCause.NOT_FOUND, message);
  }
}
