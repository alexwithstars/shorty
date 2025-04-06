import mongoose from 'mongoose'
import { ILinkDocument, LinkEntry, ModelType } from '../types.js'
import { Link } from './models.js'
import { MONGO_CONNECT_URI } from '../../utils/consts.js'

try {
  await mongoose.connect(MONGO_CONNECT_URI ?? '')
} catch (error) {
  console.error(error)
  process.exit(1)
}

export class ShortenerModel implements ModelType {
  async getUrl (alias: string): Promise<string | undefined> {
    const link = await Link.findOne({ alias })
    if (link === null) return
    link.clicks++
    await link.save()
    return link.url
  }

  async getLink (id: string): Promise<ILinkDocument | undefined> {
    if (!mongoose.isValidObjectId(id)) return
    const link = await Link.findById(id)
    if (link === null) return
    return link
  }

  async getLinks (): Promise<ILinkDocument[]> {
    const links = await Link.find()
    return links
  }

  async getAliases (): Promise<string[]> {
    const links = await Link.find()
    return links.map(link => link.alias)
  }

  async createLink (link: LinkEntry): Promise<ILinkDocument> {
    const newLink = new Link(link)
    await newLink.save()
    return newLink
  }

  async deleteLink (id: string): Promise<ILinkDocument | undefined> {
    if (!mongoose.isValidObjectId(id)) return
    const link = await Link.findByIdAndDelete(id)
    if (link === null) return
    return link
  }

  async updateLink (id: string, link: LinkEntry): Promise<ILinkDocument | undefined> {
    if (!mongoose.isValidObjectId(id)) return
    const result = await Link.findByIdAndUpdate(id, link, { new: true })
    if (result === null) return
    return result
  }

  async getClicks (id: string): Promise<number | undefined> {
    if (!mongoose.isValidObjectId(id)) return
    return (await Link.findById(id))?.clicks
  }
}

process.on('SIGINT', () => {
  void mongoose.disconnect()
})

process.on('SIGTERM', () => {
  void mongoose.disconnect()
})
