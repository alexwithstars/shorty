export const BASE_ROUTES = {
  PING: '/ping',
  APP: '/app',
  ALL: '/all',
  LINK: '/link',
  PASS: '/pass',
  CLICKS: '/clicks',
  ALIASES: '/aliases'
}

export const RESERVED_ROUTES = Object.values(BASE_ROUTES).map(route => route.slice(1))

export const {
  NODE_ENV = 'development',
  AUTH_TOKEN = '',
  MONGO_CONNECT_URI = '',
  PORT = 3000
} = globalThis?.process?.env ?? {}

export const PRODUCTION = NODE_ENV === 'production'
