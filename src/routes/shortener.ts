import { Router } from 'express'
import { ShortenerController } from '../controllers/shortener.js'
import { AUTH_TOKEN, BASE_ROUTES } from '../utils/consts.js'
import { shortenerPartialValidateBody, shortenerValidateBody } from '../middlewares/shortener.js'
import { ModelType } from '../models/types.js'
import { UNAUTHORIZED } from '../utils/reponse.js'
export function createShortenerRouter (ShortenerModel: ModelType): Router {
  const shortenerRouter = Router()
  const shortenerController = new ShortenerController(ShortenerModel)

  shortenerRouter.get(BASE_ROUTES.ALL, shortenerController.getLinks)
  shortenerRouter.get(BASE_ROUTES.ALIASES, shortenerController.getAliases)
  shortenerRouter.get(`${BASE_ROUTES.LINK}/:id`, shortenerController.getLink)
  shortenerRouter.get(`${BASE_ROUTES.CLICKS}/:id`, shortenerController.getClicks)
  shortenerRouter.get('/:alias', shortenerController.navigate)

  shortenerRouter.post(`${BASE_ROUTES.PASS}`, (req, res) => {
    const { token } = req.body
    if (token !== AUTH_TOKEN) {
      res.status(401).json(UNAUTHORIZED)
      return
    }
    res.status(200).json({})
  })

  shortenerRouter.post('/*', shortenerValidateBody)
  shortenerRouter.post('/', shortenerController.createLink)

  shortenerRouter.patch('/*', shortenerPartialValidateBody)
  shortenerRouter.patch('/:id', shortenerController.updateLink)

  shortenerRouter.delete('/*', shortenerPartialValidateBody)
  shortenerRouter.delete('/:id', shortenerController.deleteLink)
  return shortenerRouter
}
