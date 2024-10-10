import {
  BaseException,
  BaseExceptionCause,
} from '../../shared/exceptions/base-exception';

export class UserAlreadyExistsException extends BaseException {
  constructor() {
    super(BaseExceptionCause.ALREADY_EXISTS, 'Email already exists');
  }
}
