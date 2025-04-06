import { createRequire } from 'node:module'
import { object } from 'zod'
const require = createRequire(import.meta.url)

export const readJSON = (path: string): object => {
  const json = require(path)
  if (json instanceof object) return json
  throw new Error('Invalid JSON file')
}
