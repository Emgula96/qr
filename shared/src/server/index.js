import express from 'express';

// TODO: The express proxy will handle API connections for both the attendees and nextgen backend APIs

if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist'
  app.use(express.static(frontendFiles))
  app.get('/*', (_, res) => {
    res.send(frontendFiles + '/index.html')
  })
  app.listen(process.env['PORT'])
}

export const app = express();
app.get('/api/test', (_, res) => 
  res.json({ greeting: "Hello" }
))