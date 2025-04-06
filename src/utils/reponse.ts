import { PrettyZodError, ShortyErrorType, ShortyGenericError, ShortyValidationError } from '../types.d.js'

export const NOT_FOUND: ShortyGenericError = {
  type: ShortyErrorType.GENERIC,
  message: 'Not Found'
}

export const ALIAS_IN_USE: ShortyValidationError = {
  type: ShortyErrorType.VALIDATION,
  errors: [{
    path: 'alias',
    message: 'Alias already in use'
  }]
}

export const ALIAS_RESERVED: ShortyValidationError = {
  type: ShortyErrorType.VALIDATION,
  errors: [{
    path: 'alias',
    message: 'Alias is reserved'
  }]
}

export const BAD_REQUEST = (errors: PrettyZodError[]): ShortyValidationError => ({
  type: ShortyErrorType.VALIDATION,
  errors
})

export const UNAUTHORIZED: ShortyValidationError = {
  type: ShortyErrorType.VALIDATION,
  errors: [{
    path: 'token',
    message: 'Wrong token'
  }]
}

export const FORBIDDEN: ShortyGenericError = {
  type: ShortyErrorType.GENERIC,
  message: 'Forbidden'
}
