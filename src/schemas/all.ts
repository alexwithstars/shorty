import { ZodError } from 'zod'
import { PrettyZodError } from '../types.js'

export function prettyZodError (error: ZodError): PrettyZodError[] {
  const issues = error.issues.map(issue => {
    return {
      path: issue.path.join('.'),
      message: issue.message
    }
  })
  return issues
}
