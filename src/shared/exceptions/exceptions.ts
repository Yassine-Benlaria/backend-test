import {
  BaseException,
  BaseExceptionCause,
} from '../../shared/exceptions/base-exception';

export class UserNotFoundException extends BaseException {
  constructor(message?: string) {
    super(BaseExceptionCause.NOT_FOUND, message);
  }
}

export class UserAlreadyExistsException extends BaseException {
  constructor() {
    super(BaseExceptionCause.ALREADY_EXISTS, 'Email already exists');
  }
}

export class ProductNotFoundException extends BaseException {
  constructor(message?: string) {
    super(BaseExceptionCause.NOT_FOUND, message);
  }
}
