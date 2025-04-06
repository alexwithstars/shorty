import { NextFunction, Request, RequestHandler, Response } from 'express'
import { prettyZodError } from '../schemas/all.js'
import { validateLink, partialValidateLink } from '../schemas/links.js'
import { LinkEntry } from '../models/types.js'
import { SafeParseReturnType } from 'zod'
import { AUTH_TOKEN } from '../utils/consts.js'
import { UNAUTHORIZED, BAD_REQUEST } from '../utils/reponse.js'

async function validateBody (
  req: Request,
  res: Response,
  next: NextFunction,
  validationFn: (link: LinkEntry) => (
    Promise<SafeParseReturnType<LinkEntry, LinkEntry>> |
    Promise<SafeParseReturnType<Partial<LinkEntry>, Partial<LinkEntry>>>
  )
): Promise<void> {
  const { token, ...link } = req.body

  if (token !== AUTH_TOKEN) {
    res.status(401).json(UNAUTHORIZED)
    return
  }
  const validation = await validationFn(link)
  if (!validation.success) {
    res.status(400).json(BAD_REQUEST(prettyZodError(validation.error)))
    return
  }
  req.body = validation.data
  next()
}

export const shortenerValidateBody: RequestHandler = async function (req, res, next) {
  return await validateBody(req, res, next, validateLink)
}

export const shortenerPartialValidateBody: RequestHandler = async function (req, res, next) {
  return await validateBody(req, res, next, partialValidateLink)
}
