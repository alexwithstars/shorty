import { ILink, LinkEntry } from '../../models/types.js'
import { BASE_ROUTES } from '../../utils/consts.js'
import { ApiResponse, Links } from '../types/links.js'

export const getLinks = async (): Promise<Links> => {
  const response = await fetch(BASE_ROUTES.ALL)
  const data: Links = await response.json()
  return data
}

export const checkToken = async (token: string): Promise<boolean> => {
  const response = await fetch(BASE_ROUTES.PASS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  })
  return response.ok
}

export const createLink = async (link: LinkEntry, token: string): Promise<ApiResponse<ILink>> => {
  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...link, token })
  })
  const res = await response.json()
  return response.ok
    ? { ok: true, data: res }
    : { ok: false, error: res }
}

export const deleteLink = async (id: string, token: string): Promise<ApiResponse<ILink>> => {
  const response = await fetch(`/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  })
  const res = await response.json()
  return response.ok
    ? { ok: true, data: res }
    : { ok: false, error: res }
}

export const updateLink = async (id: string, link: LinkEntry, token: string): Promise<ApiResponse<ILink>> => {
  const response = await fetch(`/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...link, token })
  })
  const res = await response.json()
  return response.ok
    ? { ok: true, data: res }
    : { ok: false, error: res }
}
