import { RESERVED_ROUTES } from '../utils/consts.js'
import { ModelType } from '../models/types.js'
import { RequestHandler } from 'express'
import { NOT_FOUND, ALIAS_IN_USE, ALIAS_RESERVED } from '../utils/reponse.js'

export class ShortenerController {
  ShortenerModel: ModelType
  constructor (ShortenerModel: ModelType) {
    this.ShortenerModel = ShortenerModel
  }

  navigate: RequestHandler = async (req, res) => {
    const { alias } = req.params
    const url = await this.ShortenerModel.getUrl(alias.toLowerCase())
    if (url === undefined) {
      res.status(404).json(NOT_FOUND)
      return
    }
    res.status(302).redirect(url)
  }

  getLink: RequestHandler = async (req, res) => {
    const { id } = req.params
    const link = await this.ShortenerModel.getLink(id)
    if (link === undefined) {
      res.status(404).json(NOT_FOUND)
      return
    }
    res.json(link)
  }

  getLinks: RequestHandler = async (_req, res) => {
    const links = await this.ShortenerModel.getLinks()
    res.json(links)
  }

  getClicks: RequestHandler = async (req, res) => {
    const { id } = req.params
    const clicks = await this.ShortenerModel.getClicks(id)
    if (clicks === undefined) {
      res.status(404).json(NOT_FOUND)
      return
    }
    res.json({ clicks })
  }

  getAliases: RequestHandler = async (_req, res) => {
    const aliases = await this.ShortenerModel.getAliases()
    res.json(aliases)
  }

  createLink: RequestHandler = async (req, res) => {
    const { alias } = req.body
    const aliases = await this.ShortenerModel.getAliases()
    if (aliases.includes(alias)) {
      res.status(400).json(ALIAS_IN_USE)
      return
    }
    if (RESERVED_ROUTES.includes(alias)) {
      res.status(400).json(ALIAS_RESERVED)
      return
    }
    const link = await this.ShortenerModel.createLink(req.body)
    res.status(201).json(link)
  }

  updateLink: RequestHandler = async (req, res) => {
    const { id } = req.params
    const link = await this.ShortenerModel.updateLink(id, req.body)
    if (link === undefined) {
      res.status(404).json(NOT_FOUND)
      return
    }
    res.status(203).json(link)
  }

  deleteLink: RequestHandler = async (req, res) => {
    const { id } = req.params
    const link = await this.ShortenerModel.deleteLink(id)
    if (link === undefined) {
      res.status(404).json(NOT_FOUND)
      return
    }
    res.status(203).json(link)
  }
}
