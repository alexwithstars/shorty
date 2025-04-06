// // cors ----------
// const ALLOW_ORIGINS = [
//   'http://localhost:3000'
// ]

import { RequestHandler } from 'express'

export const cors: RequestHandler = function (_req, res, next) {
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Origin', '*')
  // if (ALLOW_ORIGINS.includes(req.headers.origin)) {
  //   res.header('Access-Control-Allow-Origin', req.headers.origin)
  // }
  next()
}
