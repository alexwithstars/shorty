interface PrettyZodError {
  path: string
  message: string
}

export const enum ShortyErrorType {
  GENERIC = 'generic',
  VALIDATION = 'validation'
}

interface ShortyBaseError {
  type: ShortyErrorType
}

export interface ShortyValidationError extends ShortyBaseError {
  type: ShortyErrorType.VALIDATION
  errors: PrettyZodError[]
}

export interface ShortyGenericError extends ShortyBaseError {
  type: ShortyErrorType.GENERIC
  message: string
}

export type ShortyError = ShortyGenericError | ShortyValidationError
