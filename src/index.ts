import 'dotenv/config'
import express, { ErrorRequestHandler } from 'express'
import { createShortenerRouter } from './routes/shortener.js'
import { BASE_ROUTES, PRODUCTION, PORT } from './utils/consts.js'
import { trackRequests } from './middlewares/development.js'
import { ShortenerModel } from './models/mongodb/shortener.js'
import fs from 'node:fs/promises'
import { ViteDevServer } from 'vite'
import { BAD_REQUEST } from './utils/reponse.js'
import debug from './debug.js'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

console.log('Starting server...')

await debug()

const app: express.Express = express()

app.disable('x-powered-by')
app.use(express.json())

if (!PRODUCTION) app.use(trackRequests())

app.get(BASE_ROUTES.PING, (_req, res) => {
  res.send('pong')
})

let vite: ViteDevServer | undefined
if (!PRODUCTION) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(BASE_ROUTES.APP, sirv(join(fileURLToPath(import.meta.url), '..', '..', 'client'), { extensions: [] }))
}

// I'm aware of this, but in this case, it's not a problem
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get(BASE_ROUTES.APP, async (req, res) => {
  try {
    const url = req.originalUrl.replace(BASE_ROUTES.APP, '')
    let template: string
    let render: (url: string) => { html: string }
    if (!PRODUCTION && vite !== undefined) {
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('./src/view/entry-server.js')).render
    } else {
      template = await fs.readFile('./dist/client/index.html', 'utf-8')
      // this is expected 'cause this is for a production build and the file
      // doesn't exist in the dev environment
      // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      render = (await import('../server/entry-server.js')).render
    }

    const rendered = render(url)

    const html = template
      .replace('<!--outlet-->', rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e: unknown) {
    if (vite === undefined || !(e instanceof Error)) {
      res.status(500).end(String(e))
      return
    }
    vite.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

app.get('/', (_req, res) => {
  res.status(302).redirect(BASE_ROUTES.APP)
})

app.use('/', createShortenerRouter(new ShortenerModel()))

app.use((_req, res) => {
  res.status(404).send('Not Found :(')
})

app.use(((err, _req, res, _next) => {
  if (err.status === 400) {
    res.status(400).json(BAD_REQUEST([]))
    return
  }
  if (res.statusCode === 400) {
    res.json(err)
    return
  }
  if (res.statusCode !== 200) {
    res.json(err)
    return
  }
  res.status(400).json(err)
}) as ErrorRequestHandler)

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

function closeServer (): void {
  server.close((err) => {
    console.log(`No longer listening on port ${PORT}`)
    if (err !== undefined) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
}

process.on('SIGINT', () => {
  closeServer()
})

process.on('SIGTERM', () => {
  closeServer()
})

export default app
