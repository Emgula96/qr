import fs from 'node:fs/promises'
import express from 'express'
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

// Serve HTML
app.use('*', async (req, res, next) => {
  try {
    const url = req.originalUrl.replace(base, '');

    console.log(`Received request for URL: ${url}`);

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      console.log('Loading template and render function in development mode...');
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      console.log('Using cached template and render function in production mode...');
      template = templateHtml;
      render = (await import('./dist/server/entry-server.jsx')).render;
    }

    console.log('Rendering...');
    const rendered = await render(url);

    const html = template.replace('<!--outlet-->', rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    console.log('Response sent successfully.');
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.error('Error during request handling:', e.stack);
    next(e);
  }
});

// Start http server with extended timeout
const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

server.setTimeout(300000); // Set a longer timeout (e.g., 5 minutes)