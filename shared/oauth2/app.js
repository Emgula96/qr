import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import getAccessToken from './token.js'

dotenv.config()

const app = express()
app.use(cors())

app.get('/token', async (req, res) => {
  try {
    const tokenResp = await getAccessToken()
    return res.status(200).json({ data: tokenResp })
  } catch (err) {
    console.error("Error fetching the token", err)
    return res.status(500).send(err)
  }
})

app.use((req, res, next) => {
  res.status(404).send();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send();
});

export default app