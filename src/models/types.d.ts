import { HydratedDocument } from 'mongoose'

export interface ILink {
  id: string
  alias: string
  url: string
  clicks: number
}

export type ILinkDocument = HydratedDocument<ILink>

export type LinkRawType = Omit<ILink, 'id'>

export type LinkEntry = Pick<ILink, 'alias' | 'url'>

export interface ModelType {
  getUrl: (alias: string) => Promise<string | undefined>
  getLink: (id: string) => Promise<ILinkDocument | undefined>
  getLinks: () => Promise<ILinkDocument[]>
  getClicks: (id: string) => Promise<number | undefined>
  getAliases: () => Promise<string[]>
  createLink: (link: LinkEntry) => Promise<ILinkDocument>
  updateLink: (id: string, link: LinkEntry) => Promise<ILinkDocument | undefined>
  deleteLink: (id: string) => Promise<ILinkDocument | undefined>
}
