import { ILink, LinkEntry } from '../../models/types.js'
import { PrettyZodError, ShortyError } from '../../types.js'

export type Links = ILink[]

export interface LinksContextProps {
  links: Links
  setLinks: React.Dispatch<React.SetStateAction<Links>>
}

export interface LinksProviderProps {
  children: React.ReactNode
}

export interface LinkHook {
  links: Links
  createLink: (link: LinkEntry) => Promise<FieldErrors | undefined>
  updateLinksList: () => Promise<void>
  deleteLink: (id: string) => Promise<FieldErrors | undefined>
  updateLink: (id: string, link: LinkEntry) => Promise<FieldErrors | undefined>
}

export type ApiResponse<T> = {
  ok: true
  data: T
} | {
  ok: false
  error: ShortyError
}

export type FieldErrors = PrettyZodError[]
