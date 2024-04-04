import fs from 'node:fs/promises'
import express from 'express'
import NodeCache from 'node-cache'
const myCache = new NodeCache()
import dotenv from 'dotenv'
dotenv.config()

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/ssr-manifest.json', 'utf-8')
  : undefined

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

app.use('/token', async (req, res, next) => {
  try {
    const cachedAccessToken = myCache.get("access-token")
    if (cachedAccessToken) {
      console.debug("Cached access token found... ", cachedAccessToken)
      res.status(200).json({token: cachedAccessToken})
    } else {
      const token = await getAccessToken()
      myCache.set('access-token', token, 20000)
      console.debug("Caching access token... ", token)
      res.status(200).json({token: cachedAccessToken})
    }
  } catch (err) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).json({error: err})
  }
})

// Serve HTML
app.use('*', async (req, res, next) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.jsx')).render
    }

    const rendered = await render(url)

    const html = template.replace(`<!--outlet-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    next(e)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})