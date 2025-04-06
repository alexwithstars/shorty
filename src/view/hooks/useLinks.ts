import { useContext } from 'react'
import { LinksContext } from '../contexts/links.js'
import { FieldErrors, LinkHook } from '../types/links.js'
import { useAuth } from './useAuth.js'
import * as apiLink from '../apis/links.js'
import { ShortyErrorType } from '../../types.d.js'
import { LinkEntry } from '../../models/types.js'

export function useLinks (): LinkHook {
  const context = useContext(LinksContext)
  if (context === undefined) {
    throw new Error('useLinks must be used within a LinksProvider')
  }

  const { token } = useAuth()
  const { links, setLinks } = context

  const updateLinksList = async (): Promise<void> => {
    const data = await apiLink.getLinks()
    setLinks(data)
  }

  const deleteLink = async (id: string): Promise<FieldErrors | undefined> => {
    const response = await apiLink.deleteLink(id, token)
    if (response.ok) {
      await updateLinksList()
      return
    }
    if (response.error.type === ShortyErrorType.GENERIC) {
      console.error(response.error.message)
      return
    }
    return response.error.errors
  }

  const createLink = async (link: LinkEntry): Promise<FieldErrors | undefined> => {
    const response = await apiLink.createLink(link, token)
    if (response.ok) {
      await updateLinksList()
      return
    }
    if (response.error.type === ShortyErrorType.GENERIC) {
      console.error(response.error.message)
      return
    }
    return response.error.errors
  }

  const updateLink = async (id: string, link: LinkEntry): Promise<FieldErrors | undefined> => {
    const response = await apiLink.updateLink(id, link, token)
    if (response.ok) {
      await updateLinksList()
      return
    }
    if (response.error.type === ShortyErrorType.GENERIC) {
      console.error(response.error.message)
      return
    }
    return response.error.errors
  }

  return {
    links,
    updateLinksList,
    deleteLink,
    createLink,
    updateLink
  }
}
