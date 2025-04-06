import { RequestHandler } from 'express'

export function trackRequests (): RequestHandler {
  return (req, res, next) => {
    res.on('finish', () => {
      console.log(res.statusCode, req.method, req.url)
    })
    next()
  }
}
