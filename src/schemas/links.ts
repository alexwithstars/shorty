import z from 'zod'
import { LinkEntry } from '../models/types.js'

const linkSchema = z.object({
  alias:
    z.string()
      .min(3, 'Alias must be at least 3 characters long')
      .regex(/^[a-z0-9]+$/i, 'Only letters and numbers')
      .transform(value => value.toLowerCase()),
  url:
    z.string()
      .url()
      .transform(value => value.trim())
})

export async function validateLink (link: LinkEntry):
Promise<z.SafeParseReturnType<LinkEntry, LinkEntry>> {
  return await linkSchema.safeParseAsync(link)
}

export async function partialValidateLink (link: LinkEntry):
Promise<z.SafeParseReturnType<Partial<LinkEntry>, Partial<LinkEntry>>> {
  return await linkSchema.partial().safeParseAsync(link)
}
