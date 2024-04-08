import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import routes from './routes/index.js'

const app = express()
app.use(cors())

app.use('/kiosk-express', routes)

app.use((req, res) => {
  res.status(404).send();
});

app.use((err, req, res) => {
  res.status(err.status || 500).send();
});

export default app;